


const texts = [
    "Hobby-Programmierer",
    "Schüler",
    "Gamer"
]

let speed = 100;

const textElements = document.querySelector(".typewriter-text")

let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
    if(charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed); 
    }
    else{
        setTimeout(eraseText, 1000)
    }
}

function eraseText() {
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1)
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter,500)
    }
}

window.onload = typeWriter;


document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formAlert");
    const submitButton = contactForm.querySelector("button[type='submit']");
    const buttonText = submitButton.querySelector(".btn-text");
    const buttonLoader = submitButton.querySelector(".btn-loader");
    
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      
      buttonText.style.display = "none";
      buttonLoader.style.display = "inline-block";
      submitButton.disabled = true;
      
      
      const formData = new FormData(contactForm);
      
     
      fetch("process_form.php", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
      
        buttonText.style.display = "inline-block";
        buttonLoader.style.display = "none";
        submitButton.disabled = false;
        
      
        formAlert.textContent = data.message;
        formAlert.className = `form-alert ${data.status}`;
        formAlert.style.display = "block";
        
        
        if (data.status === "success") {
          contactForm.reset();
          
        
          setTimeout(() => {
            formAlert.style.display = "none";
          }, 5000);
        }
      })
      .catch(error => {
       
        buttonText.style.display = "inline-block";
        buttonLoader.style.display = "none";
        submitButton.disabled = false;
        
       
        formAlert.textContent = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";
        formAlert.className = "form-alert error";
        formAlert.style.display = "block";
        console.error("Error:", error);
      });
    });
  });


  document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formAlert");
    const submitButton = contactForm.querySelector("button[type='submit']");
    const buttonText = submitButton.querySelector(".btn-text");
    const buttonLoader = submitButton.querySelector(".btn-loader");
    
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
     
      buttonText.style.display = "none";
      buttonLoader.style.display = "inline-block";
      submitButton.disabled = true;
      
      
      const formData = new FormData(contactForm);
      
      
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        to_email: "mustafacan2004.jbs@gmail.com" 
      };
      
      
      emailjs.send("service_6g3jg5y", "template_qu45qja", data)
        .then(function() {
          // Hide loading state
          buttonText.style.display = "inline-block";
          buttonLoader.style.display = "none";
          submitButton.disabled = false;
          
         
          formAlert.textContent = "Ihre Nachricht wurde erfolgreich gesendet!";
          formAlert.className = "form-alert success";
          formAlert.style.display = "block";
          
          
          contactForm.reset();
          
          
          setTimeout(() => {
            formAlert.style.display = "none";
          }, 5000);
        }, function(error) {
         
          buttonText.style.display = "inline-block";
          buttonLoader.style.display = "none";
          submitButton.disabled = false;
          
          
          formAlert.textContent = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";
          formAlert.className = "form-alert error";
          formAlert.style.display = "block";
          console.error("Error:", error);
        });
    });
  });
