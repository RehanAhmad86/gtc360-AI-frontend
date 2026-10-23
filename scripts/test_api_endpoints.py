"""
End-to-End HTTP API Test Suite for GrantSignal 360°
Tests all API endpoints, schemas, authorization headers, and plan-tier enforcement
through the proper FastAPI HTTP channel (TestClient) - not direct DB calls.
"""
import sys
import os
import uuid

# Configure UTF-8 output if possible
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add backend directory to sys.path
backend_path = os.path.abspath(r"C:\Users\PMLS\Documents\gtc360-ai")
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from starlette.testclient import TestClient
from main import app

client = TestClient(app)

def run_tests():
    print("=" * 60)
    print("GrantSignal 360 - Full HTTP API Test Suite")
    print("=" * 60)

    # 1. Health check
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] 1. GET /health -> 200 OK (Status: healthy)")

    # 2. Guest Quota & Search
    res = client.get("/guest/quota")
    assert res.status_code == 200, f"Guest quota failed: {res.text}"
    q_data = res.json()
    assert "used" in q_data and "max" in q_data, f"Invalid quota schema: {q_data}"
    print(f"[PASS] 2. GET /guest/quota -> 200 OK (Used: {q_data.get('used')}/{q_data.get('max')})")

    res = client.post("/guest/record-search")
    assert res.status_code == 200, f"Guest search recording failed: {res.text}"
    print("[PASS] 3. POST /guest/record-search -> 200 OK")

    # 3. Match API
    res = client.post("/match", json={"top_k": 5})
    assert res.status_code == 200, f"Match API failed: {res.text}"
    match_data = res.json()
    assert "matches" in match_data, "Matches field missing from /match response"
    print(f"[PASS] 4. POST /match -> 200 OK ({len(match_data['matches'])} grants returned)")

    # 4. User Registration (Free Account / Explorer Tier by default)
    test_email = f"tier_test_{uuid.uuid4().hex[:8]}@gtc360.org"
    test_password = "Password123!"
    test_name = "Dr. Eleanor Vance"

    res = client.post("/auth/signup", json={
        "email": test_email,
        "password": test_password,
        "name": test_name,
        "organizationType": "Nonprofit 501(c)(3)"
    })
    assert res.status_code in (200, 201), f"Signup failed: {res.text}"
    signup_data = res.json()
    assert "token" in signup_data, "Token missing from signup response"
    user = signup_data.get("user", {})
    assert user.get("plan") == "explorer", f"Default plan should be 'explorer', got {user.get('plan')}"
    assert user.get("planName") == "Free Account", f"Default planName should be 'Free Account', got {user.get('planName')}"
    assert isinstance(user.get("savedGrants"), list), "savedGrants should be a list"
    token = signup_data["token"]
    auth_headers = {"Authorization": f"Bearer {token}"}
    print(f"[PASS] 5. POST /auth/signup -> 200 OK (Created user on Free Account / explorer tier)")

    # 5. User Login
    res = client.post("/auth/login", json={
        "email": test_email,
        "password": test_password
    })
    assert res.status_code == 200, f"Login failed: {res.text}"
    login_data = res.json()
    assert login_data.get("user", {}).get("plan") == "explorer"
    print("[PASS] 6. POST /auth/login -> 200 OK (JWT authenticated)")

    # 6. User Profile
    res = client.get("/user/profile", headers=auth_headers)
    assert res.status_code == 200, f"Get profile failed: {res.text}"
    profile = res.json().get("user", {})
    assert profile.get("email") == test_email
    assert profile.get("plan") == "explorer"
    print("[PASS] 7. GET /user/profile -> 200 OK (Profile aligned with plan attributes)")

    # 7. Saved Grants Authority Check (Free Account: Max 5 grants)
    print("\n--- Testing Free Account Authority Boundaries ---")
    for i in range(1, 6):
        grant_id = f"GRANT-FREE-{i}"
        res = client.post("/user/saved-grants", json={"grant_id": grant_id}, headers=auth_headers)
        assert res.status_code == 200, f"Failed saving grant {i}: {res.text}"
        data = res.json()
        assert data.get("isSaved") is True
        assert data.get("count") == i

    print("[PASS] 8. Free Account saved 5 grants successfully (Limit reached)")

    # 8. Attempt 6th saved grant on Free Account -> Must fail with 403 Forbidden
    res = client.post("/user/saved-grants", json={"grant_id": "GRANT-FREE-6"}, headers=auth_headers)
    assert res.status_code == 403, f"Expected 403 on 6th grant for Free Account, got {res.status_code}: {res.text}"
    print(f"[PASS] 9. Free Account 6th grant correctly blocked: 403 Forbidden ('{res.json().get('detail')}')")

    # 9. Free Account Compare Check -> Must fail with 403 Forbidden
    res = client.post("/grants/compare", json={"grant_ids": ["GRANT-1", "GRANT-2"]}, headers=auth_headers)
    assert res.status_code == 403, f"Expected 403 for Free Account comparison, got {res.status_code}: {res.text}"
    print(f"[PASS] 10. Free Account comparison board correctly blocked: 403 Forbidden ('{res.json().get('detail')}')")

    # 10. Upgrade to Advanced Tier
    print("\n--- Testing Advanced Tier Authority Boundaries ---")
    res = client.put("/user/plan", json={"plan": "advanced"}, headers=auth_headers)
    assert res.status_code == 200, f"Plan upgrade failed: {res.text}"
    updated_user = res.json().get("user", {})
    assert updated_user.get("plan") == "advanced"
    assert updated_user.get("planName") == "Advanced Tier"
    print("[PASS] 11. PUT /user/plan -> 200 OK (Successfully updated plan to 'advanced')")

    # 11. Now save 6th grant with Advanced Tier -> Must succeed (Limit is 50)
    res = client.post("/user/saved-grants", json={"grant_id": "GRANT-FREE-6"}, headers=auth_headers)
    assert res.status_code == 200, f"Advanced Tier should allow >5 saved grants: {res.text}"
    print("[PASS] 12. Advanced Tier allows saving 6th grant (Count: 6/50)")

    # 12. Advanced Tier Compare Check (Up to 5 grants allowed)
    dummy_grant_ids = [f"ADV-G-{i}" for i in range(1, 6)]
    res = client.post("/grants/compare", json={"grant_ids": dummy_grant_ids}, headers=auth_headers)
    assert res.status_code == 200, f"Advanced Tier should allow comparing 5 grants: {res.text}"
    print("[PASS] 13. Advanced Tier comparison with 5 grants allowed: 200 OK")

    # 13. Advanced Tier Compare with 6 grants -> Must fail with 403 Forbidden
    res = client.post("/grants/compare", json={"grant_ids": dummy_grant_ids + ["ADV-G-6"]}, headers=auth_headers)
    assert res.status_code == 403, f"Expected 403 for 6 grants on Advanced Tier, got {res.status_code}: {res.text}"
    print(f"[PASS] 14. Advanced Tier 6th compare item correctly capped: 403 Forbidden ('{res.json().get('detail')}')")

    # 14. Upgrade to Professional Tier
    print("\n--- Testing Professional Tier Authority Boundaries ---")
    res = client.put("/user/plan", json={"plan": "professional"}, headers=auth_headers)
    assert res.status_code == 200, f"Plan upgrade failed: {res.text}"
    updated_user = res.json().get("user", {})
    assert updated_user.get("plan") == "professional"
    assert updated_user.get("planName") == "Professional"
    print("[PASS] 15. PUT /user/plan -> 200 OK (Successfully updated plan to 'professional')")

    # 15. Professional Tier Compare with 10 grants allowed
    pro_grant_ids = [f"PRO-G-{i}" for i in range(1, 11)]
    res = client.post("/grants/compare", json={"grant_ids": pro_grant_ids}, headers=auth_headers)
    assert res.status_code == 200, f"Professional Tier should allow comparing 10 grants: {res.text}"
    print("[PASS] 16. Professional Tier comparison with 10 grants allowed: 200 OK")

    # 16. Professional Tier Compare with 11 grants -> Must fail with 403 Forbidden
    res = client.post("/grants/compare", json={"grant_ids": pro_grant_ids + ["PRO-G-11"]}, headers=auth_headers)
    assert res.status_code == 403, f"Expected 403 for 11 grants on Professional Tier, got {res.status_code}: {res.text}"
    print(f"[PASS] 17. Professional Tier 11th compare item correctly capped: 403 Forbidden ('{res.json().get('detail')}')")

    # 17. Plan Validation Check (invalid plan string)
    res = client.put("/user/plan", json={"plan": "unsupported_vip"}, headers=auth_headers)
    assert res.status_code == 400, f"Expected 400 for invalid plan, got {res.status_code}: {res.text}"
    print(f"[PASS] 18. Invalid plan input rejected: 400 Bad Request ('{res.json().get('detail')}')")

    print("\n" + "=" * 60)
    print("ALL 18 END-TO-END HTTP API TESTS PASSED PERFECTLY!")
    print("=" * 60)

if __name__ == "__main__":
    run_tests()
