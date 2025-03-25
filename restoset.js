function showDetails(name, address, category, phone, website, hours, price, description, imageUrl) {
    document.getElementById("details-title").textContent = name;
    document.getElementById("details-address").textContent = "📍 " + address;
    document.getElementById("details-category").textContent = "🍽 " + category;
    document.getElementById("details-phone").textContent = "📞 " + phone;
    document.getElementById("details-website").textContent = website;
    document.getElementById("details-website").href = "https://" + website;
    document.getElementById("details-hours").textContent = "🕒 " + hours;
    document.getElementById("details-price").textContent = "💰 " + price;
    document.getElementById("details-description").textContent = description;
    document.getElementById("details-image").src = imageUrl;
    document.getElementById("details-section").style.display = "block";
}

function hideDetails() {
    document.getElementById("details-section").style.display = "none";
}
