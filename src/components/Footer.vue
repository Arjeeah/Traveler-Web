<template>
  <footer class="footer-container">
    <div class="footer-content">
      <div class="footer-left">
        <div class="logo-title">
          <img src="@/assets/logo.png" alt="Traveler Logo" class="logo" />
          <h1>Traveler</h1>
        </div>
        <p>
          Map your trip, set your budget and share it with your travel friends
          for more organised and fun trip
        </p>
      </div>
      <div class="footer-right">
        <h2>Info</h2>
        <p><strong>Location :</strong><br />benghazi libya</p>
        <p><strong>Phones :</strong><br />092 993 399 39</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Traveler, 2026 Benghazi libya, All rights reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  // You might want to place your logo in the assets folder
  // For example: src/assets/logo.png
  // If you don't have a logo yet, you can remove the <img> tag or use a placeholder.
};
</script>

<style scoped>
.footer-container {
  background-color: #0c0c0c; /* Slightly off-black as in the image */
  color: #ffffff;
  padding: 40px 50px;
  border-radius: 20px; /* Rounded corners */
  font-family: Arial, sans-serif; /* Generic sans-serif font */
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.footer-left {
  flex-basis: 60%; /* Takes more space */
}

.logo-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.logo {
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  margin-right: 15px;
  background-color: #f39c12; /* Orange background for the logo placeholder */
  border-radius: 50%; /* Circular logo */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px; /* Placeholder text size */
  font-weight: bold;
  color: #000; /* Placeholder text color */
}

.footer-left h1 {
  font-size: 28px;
  margin: 0;
  font-weight: bold;
}

.footer-left p {
  font-size: 16px;
  line-height: 1.6;
  color: #e0e0e0; /* Slightly lighter than pure white for paragraph */
  max-width: 400px; /* Limit width of the paragraph */
}

.footer-right {
  flex-basis: 35%; /* Takes less space */
  text-align: left; /* Align text to the left as per image */
}

.footer-right h2 {
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: bold;
}

.footer-right p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
  color: #e0e0e0;
}

.footer-right p strong {
  color: #ffffff; /* Make labels like "Location :" white */
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #333; /* Subtle separator line */
  font-size: 14px;
  color: #a0a0a0; /* Dimmer color for copyright */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-left,
  .footer-right {
    flex-basis: 100%;
    margin-bottom: 20px;
  }
  
  .footer-left p {
    max-width: 100%;
  }

  .footer-right {
    text-align: center; /* Center text on smaller screens */
  }

  .logo-title {
    justify-content: center;
  }
}
</style>
