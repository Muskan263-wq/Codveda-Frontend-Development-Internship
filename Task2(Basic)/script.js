const form = document.getElementById("signupForm");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  password: document.getElementById("password"),
};

const errorElements = {
  name: document.getElementById("nameErr"),
  email: document.getElementById("emailErr"),
  phone: document.getElementById("phoneErr"),
  password: document.getElementById("passwordErr"),
};

const successMessage = document.getElementById("successMessage");

function clearSuccess() {
  successMessage.textContent = "";
  successMessage.classList.remove("show");
}

function setFieldState(fieldName, isValid, message) {
  const input = fields[fieldName];
  const errorElement = errorElements[fieldName];

  input.classList.remove("error", "success");
  errorElement.textContent = "";

  if (message) {
    input.classList.add("error");
    errorElement.textContent = message;
  } else if (input.value.trim()) {
    input.classList.add("success");
  }

  if (!isValid && !message) {
    input.classList.remove("success");
  }
}

function validateName() {
  const value = fields.name.value.trim();
  if (!value) {
    setFieldState("name", false, "Please enter your full name.");
    return false;
  }
  if (!/^[A-Za-z\s'-]{2,}$/.test(value)) {
    setFieldState(
      "name",
      false,
      "Name can only contain letters, spaces, apostrophes, or hyphens.",
    );
    return false;
  }
  setFieldState("name", true, "");
  return true;
}

function validateEmail() {
  const value = fields.email.value.trim();
  if (!value) {
    setFieldState("email", false, "Please enter your email address.");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    setFieldState("email", false, "Please enter a valid email address.");
    return false;
  }
  setFieldState("email", true, "");
  return true;
}

function validatePhone() {
  const value = fields.phone.value.trim();
  if (!value) {
    setFieldState("phone", false, "Please enter your phone number.");
    return false;
  }
  if (!/^\d{10}$/.test(value)) {
    setFieldState("phone", false, "Phone number must be exactly 10 digits.");
    return false;
  }
  setFieldState("phone", true, "");
  return true;
}

function validatePassword() {
  const value = fields.password.value;
  if (!value) {
    setFieldState("password", false, "Please create a password.");
    return false;
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value)) {
    setFieldState(
      "password",
      false,
      "Password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.",
    );
    return false;
  }
  setFieldState("password", true, "");
  return true;
}

function validateField(fieldName) {
  if (fieldName === "name") return validateName();
  if (fieldName === "email") return validateEmail();
  if (fieldName === "phone") return validatePhone();
  if (fieldName === "password") return validatePassword();
  return true;
}

Object.entries(fields).forEach(([fieldName, input]) => {
  input.addEventListener("focus", () => {
    input.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    input.classList.remove("focused");
    validateField(fieldName);
  });

  input.addEventListener("input", () => {
    validateField(fieldName);
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearSuccess();

  const isValid = [
    validateName(),
    validateEmail(),
    validatePhone(),
    validatePassword(),
  ].every(Boolean);

  if (isValid) {
    successMessage.textContent = "Registration successful! Welcome aboard.";
    successMessage.classList.add("show");
    form.reset();
    Object.values(fields).forEach((input) => {
      input.classList.remove("error", "success");
    });
    Object.values(errorElements).forEach((element) => {
      element.textContent = "";
    });
  }
});
