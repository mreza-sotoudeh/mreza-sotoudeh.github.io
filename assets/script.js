const GH = "https://github.com/mreza-sotoudeh";
// Repositories I could confirm on the profile have direct links.
// For the others, replace `link` with the exact repository URL.
const projects = [
  { id: "airfoil", img: "assets/poster-airfoil.png", type: "Computational Methods", title: "Flow Around an Airfoil",
    summary: "Panel method, ANSYS Fluent, and PINNs compared on NACA 6409 and NACA 0024.",
    description: "Incompressible flow around NACA 6409 and NACA 0024 airfoils studied three ways: a source panel method in MATLAB, CFD in ANSYS Fluent (C-type meshes, Standard k-ε with Enhanced Wall Treatment, mesh-independence studies up to near-stall angles), and physics-informed neural networks in PyTorch. Pressure coefficients, lift and drag, contours, and streamlines are compared across methods.",
    tags: ["Python", "PyTorch", "PINN", "ANSYS Fluent", "MATLAB"], link: GH + "?tab=repositories" },
  { id: "pump", img: "assets/poster-pump.png", type: "Multibody Dynamics", title: "Reciprocating Pump Dynamics",
    summary: "Crank, rod, and piston modeled in Simscape Multibody, with flywheel torque analysis.",
    description: "A multibody model of a reciprocating pump built in MATLAB, Simulink, and Simscape Multibody. The crank, connecting rod, piston, and cylinder are modeled, and the mechanism is simulated at different operating speeds to study kinematic behavior and the torque required, including the effect of a flywheel.",
    tags: ["MATLAB", "Simulink", "Simscape Multibody", "Flywheel"], link: GH + "/reciprocating-pump-dynamics" },
  { id: "forklift", img: "assets/poster-forklift.png", type: "Mechanical Design", title: "Forklift Crane Attachment",
    summary: "Adjustable, demountable crane attachment for a 3-ton forklift.",
    description: "A team design of an adjustable, demountable crane attachment for a 3-ton forklift. Stability and structural load cases were evaluated, and the boom, bolts, pins, and welded joints were designed. The work includes SolidWorks parts, assemblies, and manufacturing drawings. It is an academic design and has not been fabricated or certified for lifting.",
    tags: ["SolidWorks", "Machine Design", "Structural Analysis"], link: GH + "/forklift-crane-attachment" },
  { id: "gearbox", img: "assets/poster-gearbox.png", type: "Machine Design", title: "Gearbox Design",
    summary: "Gears, shafts, bearings, and engineering calculations for a gearbox.",
    description: "Mechanical design and analysis of a gearbox, covering gear design, shafts, bearings, and the supporting load and strength calculations, with component selection and safety-factor checks.",
    tags: ["SolidWorks", "Gears", "Shafts", "Bearings"], link: GH + "/gearbox-design" },
  { id: "dro", img: "assets/poster-dro.png", type: "Industrial Internship", title: "DRO for a Milling Machine",
    summary: "Installation concept for a digital readout system on a manual mill.",
    description: "Developed an installation concept for a Digital Readout (DRO) system for a manual milling machine during an industrial internship. Studied magnetic linear encoders, analyzed system specifications and measurement accuracy, took dimensional measurements, and developed the installation concept in SolidWorks.",
    tags: ["SolidWorks", "Encoders", "Measurement"], link: GH + "/DRO-installation-for-milling-machine" },
  { id: "cfd", img: "assets/poster-cfd.png", type: "CFD", title: "Internal-Flow CFD",
    summary: "Curved ducts, a conical diffuser, and a converging-diverging nozzle in Fluent.",
    description: "CFD simulations of flow through curved ducts, a 30° conical diffuser, and a converging-diverging nozzle in ANSYS Fluent. Mesh-independence studies were performed, and velocity distributions, pressure losses, and flow separation were analyzed, with MATLAB post-processing and comparison with theory.",
    tags: ["ANSYS Fluent", "MATLAB", "Fluid Mechanics"], link: GH + "?tab=repositories" }
];

const grid = document.querySelector("#project-grid");
grid.replaceChildren(...projects.map((p) => {
  const b = document.createElement("button");
  b.className = "project-card"; b.type = "button"; b.dataset.id = p.id;
  b.setAttribute("aria-label", `Open details for ${p.title}`);
  b.innerHTML = `<img src="${p.img}" alt="" loading="lazy" /><div class="body"><h3></h3><p></p></div>`;
  b.querySelector("h3").textContent = p.title; b.querySelector("p").textContent = p.summary;
  return b;
}));

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("open", !open);
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false");
}));

const dlg = document.querySelector("#project-dialog");
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card"); if (!card) return;
  const p = projects.find((x) => x.id === card.dataset.id);
  dlg.querySelector("#dialog-img").src = p.img;
  dlg.querySelector("#dialog-type").textContent = p.type;
  dlg.querySelector("#dialog-title").textContent = p.title;
  dlg.querySelector("#dialog-description").textContent = p.description;
  dlg.querySelector("#dialog-tags").replaceChildren(...p.tags.map((t) => Object.assign(document.createElement("span"), { textContent: t })));
  dlg.querySelector("#dialog-link").href = p.link;
  dlg.showModal();
});
dlg.querySelector(".dialog-close").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
document.querySelector("#year").textContent = new Date().getFullYear();
