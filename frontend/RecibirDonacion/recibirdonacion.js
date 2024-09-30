document.querySelectorAll('input[name="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const otherInputDiv = document.getElementById('other-input');
        if (this.value === 'otros' && this.checked) {
            otherInputDiv.style.display = 'block';
        } else {
            otherInputDiv.style.display = 'none';
        }
    });
});