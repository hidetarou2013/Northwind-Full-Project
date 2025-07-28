@echo off
@if ""%1"" == ""-x"" goto debug
@if ""%1"" == ""--debug"" goto debug

rem -----------------------------------------------------------------------------
rem Maven Wrapper script
rem
rem Environment Variable Prequisites
rem
rem   MAVEN_OPTS       (Optional) Java runtime options used when running Maven.
rem   MAVEN_SKIP_RC    (Optional) Flag to disable loading of .mavenrc files.
rem   MVNW_VERBOSE     (Optional) Flag to show progress of wrapper script.
rem
rem -----------------------------------------------------------------------------

set MAVEN_WRAPPER_VERSION="3.2.0"
set MAVEN_WRAPPER_JAR_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/%MAVEN_WRAPPER_VERSION%/maven-wrapper-%MAVEN_WRAPPER_VERSION%.jar"
set MAVEN_WRAPPER_PROPERTIES_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/%MAVEN_WRAPPER_VERSION%/maven-wrapper-%MAVEN_WRAPPER_VERSION%.properties"
set WRAPPER_ID="spring-boot"

if defined MVNW_VERBOSE (
  echo mvnw script for Spring Boot...
)

set MAVEN_WRAPPER_JAR_DIR=%MAVEN_USER_HOME:"=%\.m2\wrapper\dists
if not defined MAVEN_USER_HOME (
  set "MAVEN_WRAPPER_JAR_DIR=%USERPROFILE%\.m2\wrapper\dists"
)

set MAVEN_WRAPPER_PROPERTIES_FILE="%~dp0.mvn\wrapper\maven-wrapper.properties"
set MAVEN_WRAPPER_JAR_FILE="%~dp0.mvn\wrapper\maven-wrapper.jar"

if not exist %MAVEN_WRAPPER_PROPERTIES_FILE% (
  if defined MVNW_VERBOSE (
    echo No maven-wrapper.properties, downloading it from %MAVEN_WRAPPER_PROPERTIES_URL%.
  )
  if not exist "%~dp0.mvn\wrapper" (
    mkdir "%~dp0.mvn\wrapper"
  )
  call :download %MAVEN_WRAPPER_PROPERTIES_URL% %MAVEN_WRAPPER_PROPERTIES_FILE%
)

for /F "usebackq eol=# delims=" %%a in (%MAVEN_WRAPPER_PROPERTIES_FILE%) do set %%a

if not defined distributionUrl (
  echo "Error: distributionUrl was not found in %MAVEN_WRAPPER_PROPERTIES_FILE%."
  exit /b 1
)

if not exist %MAVEN_WRAPPER_JAR_FILE% (
  if defined MVNW_VERBOSE (
    echo No maven-wrapper.jar, downloading from %MAVEN_WRAPPER_JAR_URL%
  )
  call :download_if_missing %MAVEN_WRAPPER_JAR_URL% %MAVEN_WRAPPER_JAR_FILE%
)

if not defined wrapperId (
  set wrapperId=%WRAPPER_ID%
)

if not defined distributionSha256Sum (
  if defined MVNW_VERBOSE (
    echo distributionSha256Sum was not found in %MAVEN_WRAPPER_PROPERTIES_FILE%, calculating it from %distributionUrl%
  )
  set "DISTRIBUTION_URL_STRING=distributionUrl=%distributionUrl%"
  call :calculate_distribution_url_checksum "%DISTRIBUTION_URL_STRING%"
  if not defined distributionSha256Sum (
    echo Error: Could not calculate distributionSha256Sum
    exit /b 1
  )
)

set DISTRIBUTION_DIR_NAME=%distributionUrl%
set DISTRIBUTION_DIR_NAME=%DISTRIBUTION_DIR_NAME::=_%
set DISTRIBUTION_DIR_NAME=%DISTRIBUTION_DIR_NAME:/=_%
set DISTRIBUTION_DIR_NAME=%DISTRIBUTION_DIR_NAME:\=_%
set DISTRIBUTION_DIR_NAME=%DISTRIBUTION_DIR_NAME:.=_%
set DISTRIBUTION_PATH=%wrapperId%\%DISTRIBUTION_DIR_NAME%\%distributionSha256Sum%
set INSTALL_DIR=%MAVEN_WRAPPER_JAR_DIR%\%DISTRIBUTION_PATH%

if not exist "%INSTALL_DIR%" (
  if defined MVNW_VERBOSE (
    echo Creating installation directory: %INSTALL_DIR%
  )
  mkdir "%INSTALL_DIR%"
)

set DISTRIBUTION_FILENAME=
for %%F in ("%distributionUrl%") do set "DISTRIBUTION_FILENAME=%%~nxF"
set "DISTRIBUTION_FILE=%INSTALL_DIR%\%DISTRIBUTION_FILENAME%"

call :download_if_missing %distributionUrl% %DISTRIBUTION_FILE%

call :verify_distribution_file %DISTRIBUTION_FILE% %distributionSha256Sum%
if %errorlevel% neq 0 (
  exit /b 1
)

set UNZIP_DIR=
for /f "tokens=1 delims=/" %%a in ('"%JAVA_HOME%\bin\jar.exe" tf "%DISTRIBUTION_FILE%"') do (
  if not defined UNZIP_DIR set "UNZIP_DIR=%%a"
)

set MAVEN_HOME=%INSTALL_DIR%\%UNZIP_DIR%

if not exist "%MAVEN_HOME%" (
  if defined MVNW_VERBOSE (
    echo Unpacking %DISTRIBUTION_FILE% to %INSTALL_DIR%
  )
  "%JAVA_HOME%\bin\jar.exe" xf "%DISTRIBUTION_FILE%" -C "%INSTALL_DIR%"
)

set MAVEN_CMD_LINE_ARGS=%*
if not defined MAVEN_SKIP_RC (
  if exist ".mavenrc" (
    if defined MVNW_VERBOSE (
      echo Found .mavenrc, reading arguments from it
    )
    for /f "usebackq tokens=*" %%a in (".mavenrc") do call :append_maven_options %%a
  )
)

setlocal EnableDelayedExpansion
set MAVEN_PROJECTBASEDIR=
call :find_project_dir
if not "!MAVEN_PROJECTBASEDIR!"=="" (
  set MAVEN_PROJECTBASEDIR=!MAVEN_PROJECTBASEDIR!
)
endlocal & set MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR%

if defined MAVEN_PROJECTBASEDIR (
  set MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR%
)

"%MAVEN_HOME%\bin\mvn.cmd" %MAVEN_CMD_LINE_ARGS%
exit /b %errorlevel%

:debug
set MVNW_VERBOSE=true
set MAVEN_CMD_LINE_ARGS=
:debug_args
shift
if ""%1""=="" goto debug_end
set MAVEN_CMD_LINE_ARGS=%MAVEN_CMD_LINE_ARGS% %1
goto debug_args
:debug_end
goto :main

:download_if_missing
if exist "%~2" (
  if defined MVNW_VERBOSE (
    echo Found existing file %~2
  )
) else (
  call :download %1 %2
)
goto :eof

:download
if defined MVNW_VERBOSE (
  echo Downloading %1
)
if exist "%SystemRoot%\System32\curl.exe" (
  "%SystemRoot%\System32\curl.exe" -sSfL "%~1" -o "%~2"
) else if exist "%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" (
  powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "((New-Object System.Net.WebClient).DownloadFile('%~1', '%~2'))"
) else (
  echo "Error: Either curl or powershell is required."
  exit /b 1
)
goto :eof

:verify_distribution_file
if exist "%SystemRoot%\System32\certutil.exe" (
  for /f "skip=1 tokens=*" %%i in ('certutil -hashfile "%~1" SHA256') do (
    if "%%i" == "%~2" (
      exit /b 0
    )
  )
  echo "Error: Verification of %~1 failed. Distribution sha256sum is %~2"
  exit /b 1
) else (
  echo "Warning: certutil not found in path. Distribution file %~1 will not be verified."
)
goto :eof

:calculate_distribution_url_checksum
if exist "%SystemRoot%\System32\certutil.exe" (
  echo %~1 > temp.txt
  for /f "skip=1 tokens=*" %%i in ('certutil -hashfile "temp.txt" SHA256') do (
    set "distributionSha256Sum=%%i"
  )
  del temp.txt
) else (
  echo "Warning: certutil not found in path."
)
goto :eof

:find_project_dir
set CWD=%cd%
:find_project_dir_loop
if exist "%CWD%\pom.xml" (
  set "MAVEN_PROJECTBASEDIR=%CWD%"
  goto :eof
)
for /f "delims=" %%a in ("%CWD%") do set "PARENT=%%~dpa"
if "!PARENT!"=="%CWD%\" (
  set "MAVEN_PROJECTBASEDIR="
  goto :eof
)
set "CWD=!PARENT:~0,-1!"
goto :find_project_dir_loop

:append_maven_options
set MAVEN_CMD_LINE_ARGS=%MAVEN_CMD_LINE_ARGS% %*
goto :eof
