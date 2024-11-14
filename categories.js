document.addEventListener("DOMContentLoaded", function() {
    const categories = [
        { name: "H5P", url: "h5p/" },
        { name: "ZUM-Apps", url: "zum-apps/" },
    ];

    const categoryList = document.getElementById("category-list");

    categories.forEach(category => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = category.url;
        link.textContent = category.name;
        listItem.appendChild(link);
        categoryList.appendChild(listItem);
    });
});
