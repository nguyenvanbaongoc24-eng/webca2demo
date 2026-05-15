@echo off
echo ============================================
echo   NACENCOMM - Auto Deploy Script
echo   GitHub + Vercel Production
echo ============================================
echo.

:: Step 1: Git add, commit, push
echo [1/3] Adding all changes to Git...
git add -A

echo [2/3] Committing changes...
set /p MSG="Commit message (or press Enter for default): "
if "%MSG%"=="" set MSG=update: deploy latest changes

git commit -m "%MSG%"
if %ERRORLEVEL% NEQ 0 (
    echo    No changes to commit. Continuing to deploy...
)

echo [3/3] Pushing to GitHub (main)...
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo    ERROR: Failed to push to GitHub. Check your connection.
    pause
    exit /b 1
)

echo.
echo [DEPLOY] Deploying to Vercel Production...
npx -y vercel --prod --yes
if %ERRORLEVEL% NEQ 0 (
    echo    ERROR: Vercel deploy failed.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   DONE! Both GitHub and Vercel are updated.
echo   Live at: https://webca2demo.vercel.app
echo ============================================
pause
