@echo off
powershell -Command "Start-Process cmd -ArgumentList '/c cd %cd% && npx prisma generate' -Verb RunAs"
