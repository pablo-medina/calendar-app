# calendar-app
Una aplicación de calendario usada como ejemplo de PWA, que también puede generarse como aplicación Android (APK) utilizando Cordova.

# Compilación
## Web
```yarn build```

## Android
```yarn build:android```

***Requisitos:***
1) JDK8 o posterior.
2) Android SDK
3) Gradle instalado e incluido en el PATH.

***NOTA:*** Esta aplicación está tomando como referencia Node v12.22.10 con Angular 13. La versión recomendada de Cordova para dicha versión es la 11.0.0. La versión 12 o posteriores no son compatibles con esta versión de Node y dan error al intentar ejecutar Cordova.

# Ejecución
## Desarrollo - Versión de escritorio (Web)
```yarn start```

## Android
### Por emulador
```yarn emulate:android```

***NOTA:*** Si en Windows da un error de comando 'sh' inexistente, seguramente se deba a que no se inicializó el emulador. Esto se puede hacer dentro de las opciones de Android Studio.

### Por dispositivo conectado
```yarn start:android```

# Release
## Android (APK)
```yarn release:android```

***NOTA:*** El APK generado no es un APK firmado, para eso se recomienda revisar la documentación de Apache Cordova:
https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html 