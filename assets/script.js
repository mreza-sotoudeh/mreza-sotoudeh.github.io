// Repositories confirmed on the GitHub profile have direct links.
// For the rest, `link` points to the repository list; replace it with the exact repository URL.
const projects = {
  airfoil: {
    type: "Computational Methods",
    title: "Airfoil Flow Analysis",
    description: "Incompressible flow around NACA 6409 and NACA 0024 airfoils studied three ways: a source panel method in MATLAB, CFD in ANSYS Fluent (C-type meshes, Standard k-ε with Enhanced Wall Treatment, mesh-independence studies up to near-stall angles), and physics-informed neural networks in PyTorch. Pressure coefficients, lift and drag, contours, and streamlines are compared across the three methods.",
    tags: ["Python", "PyTorch", "PINN", "ANSYS Fluent", "MATLAB"],
    link: "https://github.com/mreza-sotoudeh?tab=repositories"
  },
  pinnpipe: {
    type: "Scientific Machine Learning",
    title: "PINN for Pipe Flow",
    description: "A physics-informed neural network in Python (PyTorch) that simulates steady, incompressible, laminar flow inside a cylindrical pipe from the Navier–Stokes equations. Physical boundary conditions are enforced, velocity and pressure fields are predicted, and the pressure variation and friction factor are evaluated.",
    tags: ["Python", "PyTorch", "PINN", "Navier–Stokes"],
    link: "https://github.com/mreza-sotoudeh?tab=repositories"
  },
  cfd: {
    type: "CFD",
    title: "Internal-Flow CFD",
    description: "CFD simulations of flow through curved ducts, a 30° conical diffuser, and a converging-diverging nozzle in ANSYS Fluent. Mesh-independence studies were performed, and velocity distributions, pressure losses, and flow separation were analyzed, with MATLAB post-processing and comparison with theoretical results.",
    tags: ["ANSYS Fluent", "MATLAB", "Mesh Independence", "Post-processing"],
    link: "https://github.com/mreza-sotoudeh?tab=repositories"
  },
  pump: {
    type: "Multibody Dynamics",
    title: "Reciprocating Pump Dynamics",
    description: "A multibody model of a reciprocating pump built in MATLAB, Simulink, and Simscape Multibody. The crank, connecting rod, piston, and cylinder are modeled, and the mechanism is simulated at different operating speeds to study kinematic behavior and the torque required, including the effect of a flywheel.",
    tags: ["MATLAB", "Simulink", "Simscape Multibody", "Flywheel"],
    link: "https://github.com/mreza-sotoudeh/reciprocating-pump-dynamics"
  },
  forklift: {
    type: "Mechanical Design",
    title: "Forklift Crane Attachment",
    description: "A team design of an adjustable, demountable crane attachment for a 3-ton forklift. Stability and structural load cases were evaluated, and the boom, bolts, pins, and welded joints were designed. The work includes SolidWorks parts, assemblies, and manufacturing drawings. It is an academic design and has not been fabricated or certified for lifting.",
    tags: ["SolidWorks", "Machine Design", "Structural Analysis", "Engineering Drawings"],
    link: "https://github.com/mreza-sotoudeh/forklift-crane-attachment"
  },
  gearbox: {
    type: "Machine Design",
    title: "Bearings, Transmissions & Gearbox",
    description: "A series of Machine Design II projects: hydrodynamic journal bearings, rolling-bearing selection, bearing housing design, flexible power transmission, and gear and gearbox design. Each includes load and strength calculations, component selection, safety-factor evaluation, and technical comparison of alternative designs.",
    tags: ["Bearings", "Gears", "Shafts", "Safety Factor"],
    link: "https://github.com/mreza-sotoudeh/gearbox-design"
  },
  fea: {
    type: "Finite Element Analysis",
    title: "Perforated Filter Screens",
    description: "Design and analysis of perforated cylindrical filter screens for a gas scrubber application in SolidWorks and SolidWorks Simulation. Two perforation configurations were compared under pressure loading by evaluating von Mises stress and deformation to assess structural integrity.",
    tags: ["SolidWorks", "SolidWorks Simulation", "FEA"],
    link: "https://github.com/mreza-sotoudeh?tab=repositories"
  },
  dro: {
    type: "Industrial Internship",
    title: "DRO for a Milling Machine",
    description: "An installation concept for a Digital Readout (DRO) system on a manual milling machine, developed during an industrial internship. I studied magnetic linear encoders, analyzed system specifications and measurement accuracy, took dimensional measurements, and developed the installation concept in SolidWorks.",
    tags: ["SolidWorks", "Magnetic Encoders", "Measurement"],
    link: "https://github.com/mreza-sotoudeh/DRO-installation-for-milling-machine"
  },
  arduino: {
    type: "Embedded Systems",
    title: "Arduino-Based Systems",
    description: "Three Arduino-based embedded systems implemented and simulated with the Arduino IDE and Proteus: a sequential LED controller, a potentiometer-based LED and buzzer controller, and a two-digit seven-segment display with multiplexing and button debouncing. The programs are written in C/C++.",
    tags: ["Arduino", "Proteus", "C/C++"],
    link: "https://github.com/mreza-sotoudeh?tab=repositories"
  },
  numerical: {
    type: "Scientific Computing",
    title: "Numerical Analysis in Python",
    description: "Numerical methods implemented in Python: Taylor series, Lagrange and Newton interpolation, natural cubic splines, curve fitting, and least-squares regression, with error analysis. NumPy and Matplotlib are used for computation, visualization, and performance evaluation.",
    tags: ["Python", "NumPy", "Matplotlib", "Error Analysis"],
    link: "https://github.com/mreza-sotoudeh?tab=repositories"
  }
};

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  navigation.classList.toggle("open", !expanded);
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const dialog = document.querySelector("#project-dialog");
const dialogType = document.querySelector("#dialog-type");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");
const dialogTags = document.querySelector("#dialog-tags");
const dialogLink = document.querySelector("#dialog-link");

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    dialogType.textContent = project.type;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogTags.replaceChildren(...project.tags.map((tag) => {
      const element = document.createElement("span");
      element.textContent = tag;
      return element;
    }));
    dialogLink.href = project.link;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document.querySelector("#year").textContent = new Date().getFullYear();
