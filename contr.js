const firebaseConfig = {
    apiKey: "AIzaSyBZQ9FSfVg-LzEFDqn24cmALl1H7BBhX3w", //[cite: 8]
    authDomain: "practicacontr.firebaseapp.com", //[cite: 8]
    projectId: "practicacontr", //[cite: 8]
    storageBucket: "practicacontr.firebasestorage.app", //[cite: 8]
    messagingSenderId: "711236940275", //[cite: 8]
    appId: "1:711236940275:web:2ecd3ed049d5c851fae286" //[cite: 8]
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 1. Manejo del formulario de LOGIN (index.html)
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {
            const cred = await auth.signInWithEmailAndPassword(email, password);
            const idToken = await cred.user.getIdToken();

            sessionStorage.setItem("idToken", idToken);
            sessionStorage.setItem("userEmail", cred.user.email);
            sessionStorage.setItem("userUid", cred.user.uid);

            await Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: `Sesión iniciada como ${cred.user.email}`,
                timer: 1300,
                showConfirmButton: false
            });

            window.location.href = "hola.html";
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesión",
                text: error.message
            });
        }
    });
}

// 2. Manejo del formulario de REGISTRO (registro.html)
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
    formRegistro.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;

        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            const idToken = await cred.user.getIdToken();

            sessionStorage.setItem("idToken", idToken);
            sessionStorage.setItem("userEmail", cred.user.email);
            sessionStorage.setItem("userUid", cred.user.uid);

            await Swal.fire({
                icon: "success",
                title: "¡Cuenta creada!",
                text: `Usuario registrado: ${cred.user.email}`,
                timer: 1300,
                showConfirmButton: false
            });

            window.location.href = "hola.html";
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al registrar",
                text: error.message
            });
        }
    });
}

// 3. Manejo de la página HOLA (hola.html)
const saludoEl = document.getElementById("saludo");
const infoTokenEl = document.getElementById("infoToken");
const btnLogout = document.getElementById("btnLogout");

if (saludoEl && infoTokenEl) {
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            sessionStorage.clear();
            window.location.href = "contr.html";
            return;
        }

        const idToken = await user.getIdToken();
        sessionStorage.setItem("idToken", idToken);
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("userUid", user.uid);

        saludoEl.textContent = `Hola, ${user.email}`;
        infoTokenEl.innerHTML = `<strong>UID:</strong> ${user.uid}<br><strong>ID Token:</strong> ${idToken}`;
    });
}

if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
        await auth.signOut();
        sessionStorage.clear();
        await Swal.fire({
            icon: "info",
            title: "Sesión cerrada",
            timer: 1100,
            showConfirmButton: false
        });
        window.location.href = "contr.html";
    });
}