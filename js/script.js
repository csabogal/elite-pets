/**
 * Elite Pets - JavaScript Principal
 *
 * Este archivo contiene toda la lógica JavaScript del sitio web de Elite Pets.
 * Fue desarrollado como parte del proyecto de Front-End para la universidad.
 *
 * Autor: Grupo 7
 * Fecha: 7 de abril del 2025
 * Universidad: Politécnico Gran Colombiano
 * Materia: Front-End
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  //
  // Validación de Formularios
  //
  // Obtener referencias a los formularios
  const registroForm = document.getElementById("registro-form");
  const loginForm = document.getElementById("login-form");
  const contactForm = document.getElementById("contactForm");

  //
  // Función para validar un formulario genérico
  //
  // Verifica que todos los campos requeridos estén completos
  // y muestra mensajes de error cuando es necesario.
  function validarFormulario(form) {
    // Obtener todos los campos requeridos
    const camposRequeridos = form.querySelectorAll("input[required]");
    let formularioValido = true;

    // Iterar sobre los campos requeridos
    camposRequeridos.forEach((campo) => {
      // Verificar si el campo está vacío
      if (campo.value.trim() === "") {
        // Mostrar mensaje de error
        mostrarError(campo, "Este campo es obligatorio.");
        formularioValido = false;
      } else {
        // Limpiar mensaje de error
        limpiarError(campo);
      }
    });

    return formularioValido;
  }

  //
  // Función para mostrar un mensaje de error
  //
  // Muestra un mensaje de error debajo del campo correspondiente
  function mostrarError(campo, mensaje) {
    // Obtener el elemento span para el mensaje de error
    const spanError = campo.nextElementSibling;
    // Mostrar el mensaje
    spanError.textContent = mensaje;
  }

  //
  // Función para limpiar un mensaje de error
  //
  // Elimina el mensaje de error cuando el campo es válido
  function limpiarError(campo) {
    // Obtener el elemento span para el mensaje de error
    const spanError = campo.nextElementSibling;
    // Limpiar el mensaje
    spanError.textContent = "";
  }

  //
  // Función para mostrar mensajes de error generales
  //
  // Muestra mensajes de error en el formulario de manera
  // clara y visible para el usuario.
  function mostrarErrorGeneral(mensaje, formulario) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = mensaje;

    // Remover mensajes de error anteriores
    const erroresAnteriores = formulario.querySelectorAll(".error-message");
    erroresAnteriores.forEach((error) => error.remove());

    // Insertar el nuevo mensaje de error
    formulario.insertBefore(errorDiv, formulario.firstChild);

    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }

  //
  // Función para enviar el formulario de contacto
  //
  // Simula el envío del formulario y muestra un mensaje
  // de éxito al usuario.
  function enviarFormularioContacto(nombre, email, mensaje) {
    // Aquí iría la lógica para enviar los datos al servidor
    // Por ahora solo simulamos el envío

    // Mostrar mensaje de éxito
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = "¡Mensaje enviado con éxito!";

    contactForm.innerHTML = ""; // Limpiar el formulario
    contactForm.appendChild(successMessage);

    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
      successMessage.remove();
      contactForm.reset(); // Resetear el formulario
    }, 3000);
  }

  //
  // Validación del Formulario de Registro
  //
  // Agregar listener al evento submit del formulario de registro
  if (registroForm) {
    registroForm.addEventListener("submit", function (e) {
      // Prevenir el comportamiento por defecto del formulario
      e.preventDefault();

      // Validar el formulario
      if (validarFormulario(registroForm)) {
        // Enviar el formulario (simulado)
        alert("Registro exitoso!");
        registroForm.reset();
      }
    });
  }

  //
  // Validación del Formulario de Login
  //
  // Agregar listener al evento submit del formulario de login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      // Prevenir el comportamiento por defecto del formulario
      e.preventDefault();

      // Validar el formulario
      if (validarFormulario(loginForm)) {
        // Enviar el formulario (simulado)
        alert("Login exitoso!");
        loginForm.reset();
      }
    });
  }

  //
  // Validación del Formulario de Contacto
  //
  // Implementa la validación del formulario para asegurar
  // que los datos ingresados sean correctos antes de enviarlos.
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevenir el envío por defecto del formulario

      // Obtener los valores de los campos
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      // Validar que los campos no estén vacíos
      if (!nombre || !email || !mensaje) {
        mostrarErrorGeneral(
          "Por favor, complete todos los campos",
          contactForm
        );
        return;
      }

      // Validar formato de email usando expresión regular
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarErrorGeneral("Por favor, ingrese un email válido", contactForm);
        return;
      }

      // Si todas las validaciones pasan, enviar el formulario
      enviarFormularioContacto(nombre, email, mensaje);
    });
  }

  //
  // Navegación Suave
  //
  // Implementa el scroll suave para los enlaces de navegación
  // internos, mejorando la experiencia de usuario.
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  //
  // Animaciones al Scroll
  //
  // Añade animaciones a los elementos cuando entran
  // en el viewport del navegador.
  const elementosAnimables = document.querySelectorAll(
    ".servicio, .testimonio"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elementosAnimables.forEach((elemento) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(20px)";
    elemento.style.transition =
      "opacity 0.5s ease-out, transform 0.5s ease-out";
    observer.observe(elemento);
  });
});
