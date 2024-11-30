const form = document.getElementById("apiForm");
const resultDiv = document.getElementById("result");
const baseButton = document.getElementById("fetchBase");
const actionButtons = document.getElementById("actionButtons");

document.getElementById("aboutUs").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Esto no se trata de nosotros, disfrutá del universo de Rick and Morty.");
  });

// Manejar el formulario para consultar endpoints
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const endpoint = document.getElementById("endpoint").value.trim();

  if (!endpoint) {
    alert("El campo no puede estar vacío.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint }),
    });

    const data = await response.json();

    if (response.ok) {
      displayData(data);
      actionButtons.style.display = "block"; // Mostrar botones de acción
    } else {
      alert(data.error || "Error al procesar la solicitud.");
      actionButtons.style.display = "none"; // Ocultar botones si hay error
    }
  } catch (error) {
    alert("Ocurrió un error al conectar con el servidor.");
    actionButtons.style.display = "none"; // Ocultar botones si hay error
  }
});

// Consultar la URL base
baseButton.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/api/base");
    const data = await response.json();

    displayBaseRoutes(data);
    actionButtons.style.display = "none"; // No mostrar botones para la URL base
  } catch (error) {
    alert("Ocurrió un error al obtener la información de la URL base.");
  }
});

function displayData(data) {
    resultDiv.innerHTML = ""; // Limpia resultados previos
  
    if (data.results) {
      const table = document.createElement("table");
      table.innerHTML = `
        <thead>
          <tr>${Object.keys(data.results[0]).map((key) => `<th>${key}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${data.results
            .map(
              (item) =>
                `<tr>${Object.values(item)
                  .map((value) => `<td>${formatValue(value)}</td>`)
                  .join("")}</tr>`
            )
            .join("")}
        </tbody>
      `;
  
      // Agregar la tabla al resultado directamente
      resultDiv.appendChild(table);
    } else {
      resultDiv.textContent = "No hay datos disponibles.";
    }
  }

// Mostrar las rutas base
function displayBaseRoutes(data) {
  resultDiv.innerHTML = "<h3>Rutas disponibles:</h3>";
  const ul = document.createElement("ul");
  Object.entries(data).forEach(([key, value]) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${key}:</strong> <a href="${value}" target="_blank">${value}</a>`;
    ul.appendChild(li);
  });
  resultDiv.appendChild(ul);
}

// Formatear valores para mostrarlos
function formatValue(value) {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "N/A";
  } else if (typeof value === "object" && value !== null) {
    return value.name || JSON.stringify(value);
  } else {
    return value || "N/A";
  }
}

// Imprimir los resultados
document.getElementById("printResults").addEventListener("click", () => {
  if (resultDiv.innerHTML.trim() === "") {
    alert("No hay resultados para imprimir.");
    return;
  }
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Resultados</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        ${resultDiv.innerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
});

// Descargar resultados como CSV
document.getElementById("downloadResults").addEventListener("click", () => {
  const table = resultDiv.querySelector("table");
  if (!table) {
    alert("No hay resultados para descargar.");
    return;
  }

  let csv = "";
  const rows = table.querySelectorAll("tr");
  rows.forEach((row) => {
    const cols = row.querySelectorAll("th, td");
    csv += Array.from(cols)
      .map((col) => `"${col.textContent.trim()}"`)
      .join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "resultados.csv";
  link.click();
  URL.revokeObjectURL(url);
});
