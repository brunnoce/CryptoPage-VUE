<template>
  <footer>
    <div class="footer-line"></div>
    <div class="footer-content">
      <h4>Datos de contacto</h4>
      <div class="contact-info">
        <p><strong>Dirección:</strong> Exchange Street 4324, Los Angeles, USA</p>
        <p><strong>Teléfono:</strong> +54-3564417646</p>
        <p><strong>Email:</strong> cryptopage@cripto.com</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PageFooter',
}
</script>

<style scoped>
.footer-line {
  width: 100%;
  border-top: 2px solid #034AA6; 
  margin-bottom: 20px;
}

footer {
  padding: 20px;
  text-align: center;
  color: #5CF2F2;
  font-size: 14px;
  background-color:rgba(3, 74, 166, 0.1) 
}

.footer-content h4 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #034AA6;
}

.footer-content p {
  margin: 5px 0;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 30px; 
  flex-wrap: wrap;
}

.contact-info p {
  margin: 0;
  font-size: 16px;
}

@media (max-width: 768px) {
  .contact-info {
    flex-direction: column;
    align-items: center;
  }
}
</style>