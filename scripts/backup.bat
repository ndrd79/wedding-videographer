@echo off
set BACKUP_DIR=..\wedding-videographer-backup-%date:~-4,4%%date:~-10,2%%date:~-7,2%
echo Creating backup in %BACKUP_DIR%

mkdir %BACKUP_DIR%

xcopy /E /I /H /Y ".env" "%BACKUP_DIR%"
xcopy /E /I /H /Y ".env.local" "%BACKUP_DIR%"
xcopy /E /I /H /Y ".eslintrc.json" "%BACKUP_DIR%"
xcopy /E /I /H /Y ".gitignore" "%BACKUP_DIR%"
xcopy /E /I /H /Y "README.md" "%BACKUP_DIR%"
xcopy /E /I /H /Y "next-env.d.ts" "%BACKUP_DIR%"
xcopy /E /I /H /Y "next.config.js" "%BACKUP_DIR%"
xcopy /E /I /H /Y "next.config.ts" "%BACKUP_DIR%"
xcopy /E /I /H /Y "package.json" "%BACKUP_DIR%"
xcopy /E /I /H /Y "package-lock.json" "%BACKUP_DIR%"
xcopy /E /I /H /Y "postcss.config.mjs" "%BACKUP_DIR%"
xcopy /E /I /H /Y "tailwind.config.ts" "%BACKUP_DIR%"
xcopy /E /I /H /Y "tsconfig.json" "%BACKUP_DIR%"

xcopy /E /I /H /Y "data" "%BACKUP_DIR%\data\"
xcopy /E /I /H /Y "prisma" "%BACKUP_DIR%\prisma\"
xcopy /E /I /H /Y "public" "%BACKUP_DIR%\public\"
xcopy /E /I /H /Y "scripts" "%BACKUP_DIR%\scripts\"
xcopy /E /I /H /Y "src" "%BACKUP_DIR%\src\"
xcopy /E /I /H /Y "types" "%BACKUP_DIR%\types\"

echo Backup completed successfully!
