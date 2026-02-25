export default function showToast(data) {
    const toast = document.createElement("div");

    toast.classList.add("toast", `toast--${data.type}`);
    const text = document.createElement("p");
    const img = document.createElement("img");

    text.classList.add("toast__text");
    text.textContent = `${data.title}. ${data.text}`;

    img.src = `../../images/${data.type}.png`;

    toast.append(img, text);

    document.body.append(toast);

    setTimeout(() => {
        toast.remove();
    }, data.time || 3000);
}