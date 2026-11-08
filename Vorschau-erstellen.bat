@echo off
cd /d "%~dp0"
echo Seite wird aus "Texte-und-Kontaktdaten.txt" gebaut ...
call npm run preview
echo.
echo Fertig. Die Vorschau liegt im Ordner dist\preview - dort index.html doppelklicken.
pause
