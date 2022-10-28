const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  copyIcon = document.querySelector(".input-box span"),
  generateBtn = document.querySelector(".generate-btn");

const charachters = {
  lowercase: "abcdefghigklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIGKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$&%|[](){}:;.,*+-#@<>~",
}

const generatePassword = () => {
  let staticPassword = "",
    randomPasword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach(option => {
    if (option.checked) {
      if (option.id !== "exc-dublicate" && option.id !== "spaces") {
        staticPassword += charachters[option.id]
      } else if (option.id === "spaces") {
        staticPassword += ` ${staticPassword} `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPasword.includes(randomChar) || randomChar == " " ? randomPasword += randomChar : i--;
    } else {
      randomPasword += randomChar;
    }
  }
  passwordInput.value = randomPasword;
}

const updatePassIndicator = () => {
  passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
}

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.style.color = "#4285F4";
  copyIcon.innerText = "check";
  setTimeout(() => {
    copyIcon.style.color = "#707070";
    copyIcon.innerText = "copy_all";
  }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
