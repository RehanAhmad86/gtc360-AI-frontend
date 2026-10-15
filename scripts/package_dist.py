import os
import zipfile

def package_dist():
    dist_dir = 'dist'
    zip_name = 'dist.zip'
    
    if not os.path.exists(dist_dir):
        print(f"Error: '{dist_dir}' directory does not exist. Run 'npm run build' first.")
        return

    # Ensure any assets are also mirrored into root of dist for flat-extract hostings
    assets_dir = os.path.join(dist_dir, 'assets')
    if os.path.exists(assets_dir):
        for af in os.listdir(assets_dir):
            src_af = os.path.join(assets_dir, af)
            dest_af = os.path.join(dist_dir, af)
            if os.path.isfile(src_af):
                import shutil
                shutil.copy2(src_af, dest_af)

    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(dist_dir):
            dirs.sort()
            files.sort()
            
            # Explicit directories with POSIX forward slash and Unix 0o755 permissions
            for d in dirs:
                dir_full = os.path.join(root, d)
                arcname = os.path.relpath(dir_full, dist_dir).replace('\\', '/') + '/'
                zinfo = zipfile.ZipInfo(arcname)
                zinfo.external_attr = 0o755 << 16 | 0o040000 << 16 | 0x10
                zf.writestr(zinfo, '')
                
            # Files with POSIX forward slash and Unix 0o644 permissions
            for f in files:
                file_full = os.path.join(root, f)
                arcname = os.path.relpath(file_full, dist_dir).replace('\\', '/')
                with open(file_full, 'rb') as fp:
                    data = fp.read()
                zinfo = zipfile.ZipInfo(arcname)
                zinfo.external_attr = 0o644 << 16
                zinfo.compress_type = zipfile.ZIP_DEFLATED
                zf.writestr(zinfo, data)
                
    print(f"Linux-compliant '{zip_name}' created successfully (with dual-path root/assets support).")

if __name__ == '__main__':
    package_dist()
