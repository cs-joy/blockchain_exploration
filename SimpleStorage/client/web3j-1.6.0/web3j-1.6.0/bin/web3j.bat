@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%"=="" @echo off
@rem ##########################################################################
@rem
@rem  web3j startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
@rem This is normally unused
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and WEB3J_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo. 1>&2
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH. 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo. 1>&2
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME% 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\web3j-cli-1.6.0.jar;%APP_HOME%\lib\smartcheck.jar;%APP_HOME%\lib\epirus-web3j-0.0.7.jar;%APP_HOME%\lib\codegen-4.12.0.jar;%APP_HOME%\lib\contracts-4.12.0.jar;%APP_HOME%\lib\hosted-providers-4.12.0.jar;%APP_HOME%\lib\core-4.12.0.jar;%APP_HOME%\lib\crypto-4.12.0.jar;%APP_HOME%\lib\abi-4.12.0.jar;%APP_HOME%\lib\kotlinpoet-jvm-1.16.0.jar;%APP_HOME%\lib\kotlin-reflect-1.9.22.jar;%APP_HOME%\lib\logging-interceptor-4.12.0.jar;%APP_HOME%\lib\okhttp-4.12.0.jar;%APP_HOME%\lib\tuweni-units-2.4.2.jar;%APP_HOME%\lib\tuweni-bytes-2.4.2.jar;%APP_HOME%\lib\kotlin-logging-jvm-3.0.5.jar;%APP_HOME%\lib\okio-jvm-3.6.0.jar;%APP_HOME%\lib\kotlin-stdlib-jdk8-1.9.10.jar;%APP_HOME%\lib\kotlin-stdlib-jdk7-1.9.10.jar;%APP_HOME%\lib\kotlin-stdlib-1.9.24.jar;%APP_HOME%\lib\picocli-4.7.6.jar;%APP_HOME%\lib\gson-2.11.0.jar;%APP_HOME%\lib\docker-java-3.3.6.jar;%APP_HOME%\lib\docker-java-transport-jersey-3.3.6.jar;%APP_HOME%\lib\docker-java-transport-netty-3.3.6.jar;%APP_HOME%\lib\docker-java-core-3.3.6.jar;%APP_HOME%\lib\commons-lang3-3.14.0.jar;%APP_HOME%\lib\java-semver-0.10.2.jar;%APP_HOME%\lib\log4j-core-2.23.1.jar;%APP_HOME%\lib\jansi-2.4.1.jar;%APP_HOME%\lib\slf4j-nop-2.0.13.jar;%APP_HOME%\lib\rlp-4.12.0.jar;%APP_HOME%\lib\utils-4.12.0.jar;%APP_HOME%\lib\annotations-13.0.jar;%APP_HOME%\lib\javapoet-1.13.0.jar;%APP_HOME%\lib\junit-platform-launcher-1.5.2.jar;%APP_HOME%\lib\junit-jupiter-engine-5.5.2.jar;%APP_HOME%\lib\junit-vintage-engine-5.5.2.jar;%APP_HOME%\lib\tuples-4.12.0.jar;%APP_HOME%\lib\jnr-unixsocket-0.38.22.jar;%APP_HOME%\lib\rxjava-2.2.21.jar;%APP_HOME%\lib\Java-WebSocket-1.5.6.jar;%APP_HOME%\lib\jackson-jaxrs-json-provider-2.17.1.jar;%APP_HOME%\lib\jackson-jaxrs-base-2.17.1.jar;%APP_HOME%\lib\jackson-module-jaxb-annotations-2.17.1.jar;%APP_HOME%\lib\jackson-core-2.17.1.jar;%APP_HOME%\lib\docker-java-api-3.3.6.jar;%APP_HOME%\lib\jackson-annotations-2.17.1.jar;%APP_HOME%\lib\jackson-databind-2.17.1.jar;%APP_HOME%\lib\jcl-over-slf4j-1.7.30.jar;%APP_HOME%\lib\slf4j-api-2.0.13.jar;%APP_HOME%\lib\ens-normalize-0.2.0.jar;%APP_HOME%\lib\jc-kzg-4844-1.0.0.jar;%APP_HOME%\lib\error_prone_annotations-2.27.0.jar;%APP_HOME%\lib\log4j-api-2.23.1.jar;%APP_HOME%\lib\bcpkix-jdk18on-1.76.jar;%APP_HOME%\lib\bcutil-jdk18on-1.76.jar;%APP_HOME%\lib\bcprov-jdk18on-1.78.1.jar;%APP_HOME%\lib\junit-platform-engine-1.5.2.jar;%APP_HOME%\lib\junit-jupiter-api-5.5.2.jar;%APP_HOME%\lib\junit-platform-commons-1.5.2.jar;%APP_HOME%\lib\apiguardian-api-1.1.0.jar;%APP_HOME%\lib\junit-4.12.jar;%APP_HOME%\lib\jnr-enxio-0.32.17.jar;%APP_HOME%\lib\jnr-posix-3.1.19.jar;%APP_HOME%\lib\jnr-ffi-2.2.16.jar;%APP_HOME%\lib\jnr-constants-0.10.4.jar;%APP_HOME%\lib\reactive-streams-1.0.3.jar;%APP_HOME%\lib\framework-1.3.2.jar;%APP_HOME%\lib\framework-internal-1.3.2.jar;%APP_HOME%\lib\kotlin-stdlib-common-1.9.10.jar;%APP_HOME%\lib\docker-java-transport-3.3.6.jar;%APP_HOME%\lib\commons-io-2.13.0.jar;%APP_HOME%\lib\commons-compress-1.21.jar;%APP_HOME%\lib\guava-19.0.jar;%APP_HOME%\lib\jersey-apache-connector-2.30.1.jar;%APP_HOME%\lib\httpclient-4.5.12.jar;%APP_HOME%\lib\httpcore-4.4.13.jar;%APP_HOME%\lib\jersey-client-2.30.1.jar;%APP_HOME%\lib\jersey-hk2-2.30.1.jar;%APP_HOME%\lib\junixsocket-common-2.6.1.jar;%APP_HOME%\lib\junixsocket-native-common-2.6.1.jar;%APP_HOME%\lib\netty-handler-proxy-4.1.46.Final.jar;%APP_HOME%\lib\netty-codec-http-4.1.46.Final.jar;%APP_HOME%\lib\netty-handler-4.1.46.Final.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.46.Final-linux-x86_64.jar;%APP_HOME%\lib\netty-transport-native-kqueue-4.1.46.Final-osx-x86_64.jar;%APP_HOME%\lib\opentest4j-1.2.0.jar;%APP_HOME%\lib\hamcrest-core-1.3.jar;%APP_HOME%\lib\jffi-1.3.13.jar;%APP_HOME%\lib\jffi-1.3.13-native.jar;%APP_HOME%\lib\asm-commons-9.2.jar;%APP_HOME%\lib\asm-util-9.2.jar;%APP_HOME%\lib\asm-analysis-9.2.jar;%APP_HOME%\lib\asm-tree-9.2.jar;%APP_HOME%\lib\asm-9.2.jar;%APP_HOME%\lib\jnr-a64asm-1.0.0.jar;%APP_HOME%\lib\jnr-x86asm-1.0.2.jar;%APP_HOME%\lib\jersey-common-2.30.1.jar;%APP_HOME%\lib\jakarta.ws.rs-api-2.1.6.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\commons-codec-1.11.jar;%APP_HOME%\lib\hk2-locator-2.6.1.jar;%APP_HOME%\lib\hk2-api-2.6.1.jar;%APP_HOME%\lib\hk2-utils-2.6.1.jar;%APP_HOME%\lib\jakarta.inject-2.6.1.jar;%APP_HOME%\lib\javassist-3.25.0-GA.jar;%APP_HOME%\lib\netty-codec-socks-4.1.46.Final.jar;%APP_HOME%\lib\netty-codec-4.1.46.Final.jar;%APP_HOME%\lib\netty-transport-native-unix-common-4.1.46.Final.jar;%APP_HOME%\lib\netty-transport-4.1.46.Final.jar;%APP_HOME%\lib\netty-buffer-4.1.46.Final.jar;%APP_HOME%\lib\netty-resolver-4.1.46.Final.jar;%APP_HOME%\lib\netty-common-4.1.46.Final.jar;%APP_HOME%\lib\jakarta.annotation-api-1.3.5.jar;%APP_HOME%\lib\osgi-resource-locator-1.0.3.jar;%APP_HOME%\lib\aopalliance-repackaged-2.6.1.jar;%APP_HOME%\lib\jakarta.xml.bind-api-2.3.3.jar;%APP_HOME%\lib\jakarta.activation-api-1.2.2.jar


@rem Execute web3j
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %WEB3J_OPTS%  -classpath "%CLASSPATH%" org.web3j.console.Web3j %*

:end
@rem End local scope for the variables with windows NT shell
if %ERRORLEVEL% equ 0 goto mainEnd

:fail
rem Set variable WEB3J_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
set EXIT_CODE=%ERRORLEVEL%
if %EXIT_CODE% equ 0 set EXIT_CODE=1
if not ""=="%WEB3J_EXIT_CONSOLE%" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
