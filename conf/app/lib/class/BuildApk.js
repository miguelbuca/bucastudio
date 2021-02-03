var form = new Form();

/** Criação da estrutura de base */

BasStructureDirectory = () => {

    opStart.innerHTML = `Preparando arquivos`;

    let javaBaseCode =
        `
package com.bucastudio.app;
import android.widget.TextView;

public final class Main extends android.app.Activity {
    protected @Override void onCreate(final android.os.Bundle activityState) {
        super.onCreate(activityState);
        final TextView textV = new TextView(Main.this);
        textV.setText("Hello world");
        setContentView(textV);
    }
}
`;

    let ManifestCode =
        `
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.bucastudio.app">

    <application
        android:label="Main Activity">
        <activity android:name=".Main">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`;

    fs.writeFileSync(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2] +
        `/app/src/main/java/com/bucastudio/app/Main.java`, javaBaseCode);

    fs.writeFileSync(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2] +
        '/app/src/main/AndroidManifest.xml', ManifestCode);

    fs.mkdirSync(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2] +
        '/app/src/main/res');
}

RunFiles = () =>{
    opStart.innerHTML = 'Executando arquivos';
    form.Terminal(ANDROID_BASE + '\\build-tools\\23.0.3', `aapt package -f  -I ${ANDROID_BASE}\\platforms\\android-23\\android.jar -J src -m  -M ${recentProjectPath.split('|')[recentProjectPath.split('|').length - 2]+'\\app\\src\\main\\AndroidManifest.xml'} -S ${recentProjectPath.split('|')[recentProjectPath.split('|').length - 2]+'\\app\\src\\main\\res'} -v`, (res) => {
        if (res[0] === null) {
            form.Terminal(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2], `javac  -bootclasspath ${ANDROID_BASE}\\platforms\\android-23\\android.jar  -classpath src -source 1.7 -target 1.7 ${recentProjectPath.split('|')[recentProjectPath.split('|').length - 2]}\\app\\src\\main\\java\\com\\bucastudio\\app\\*.java`, (res) => {
                if(res[0] === null){
                    form.Terminal(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2] + '\\app', `java -jar ${ANDROID_BASE}\\build-tools\\23.0.3\\jill.jar  --output classes.jayce src`, (res) => {
                        if (res[0] === null) {
                            form.Terminal(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2] + '\\app', `java -jar ${ANDROID_BASE}\\build-tools\\23.0.3\\jack.jar  --import classes.jayce --output-dex .`, (res) => {
                                if (res[0] === null) {
                                    form.Terminal(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2] + '\\app', `java -jar ${ANDROID_BASE}\\build-tools\\23.0.3\\jill.jar  --output classes.jayce src`, (res) => {
                                        if (res[0] === null) {
                                            form.Terminal(ANDROID_BASE + '\\build-tools\\23.0.3', `aapt package -f  -F app.apkPart -I ${ANDROID_BASE}\\platforms\\android-23\\android.jar -M ${recentProjectPath.split('|')[recentProjectPath.split('|').length - 2]+'\\app\\src\\main\\AndroidManifest.xml'} -S ${recentProjectPath.split('|')[recentProjectPath.split('|').length - 2]+'\\app\\src\\main\\res'} -v`, (res) => {
                                                form.Terminal(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2] + '\\app', `java -jar ${ANDROID_BASE}\\build-tools\\23.0.3\\jill.jar  --output classes.jayce src`, (res) => {
                                                    if (res[0] === null) {
                                                        form.Terminal(recentProjectPath.split('|')[recentProjectPath.split('|').length - 2] + '\\app', `java -classpath ${ANDROID_BASE}\\tools\\lib\\sdklib.jar  com.android.sdklib.build.ApkBuilderMain`, (res) => {
                                                            ini();
                                                            console.log(res)
                                                            opStart.innerHTML = res[0] !== null ? 'Operação incompleta' : 'Executando emulador';
                                                        });
                                                    } else {
                                                        opStart.innerHTML = 'Operação incompleta';
                                                    }
                                                });
                                            });
                                        } else {
                                            opStart.innerHTML = 'Operação incompleta';
                                        }
                                    });
                                } else {
                                    opStart.innerHTML = 'Operação incompleta';
                                }
                            });
                        } else {
                            opStart.innerHTML = 'Operação incompleta';
                        }
                    });
                }else{
                    opStart.innerHTML = 'Operação incompleta';
                }
            });
        } else {
            opStart.innerHTML = 'Operação incompleta';
        }
    });
}

buildApk.addEventListener('click', function () {
    opStart.innerHTML = 'executando aplicação';
    BasStructureDirectory();
    RunFiles();
});