// ===== PLAN LEKCJI =====
const plan = document.getElementById("plan");

if (plan) {

const godziny = [
  "08:00","09:00","10:00",
  "11:00","12:00","13:00","14:00"
];

const dni = 5;

let lessons = JSON.parse(localStorage.getItem("lessons")) || {};

godziny.forEach((godzina, row) => {

  const godzDiv = document.createElement("div");
  godzDiv.className = "godzina";
  godzDiv.textContent = godzina;
  plan.appendChild(godzDiv);

  for (let col = 0; col < dni; col++) {
    const slot = document.createElement("div");
    slot.className = "slot";

    const key = `${row}-${col}`;

    if (lessons[key]) {
      slot.innerHTML = `<div class="lesson">${lessons[key]}</div>`;
    }

    slot.onclick = () => {
      const nazwa = prompt("Nazwa lekcji:");
      if (!nazwa) return;

      lessons[key] = nazwa;
      localStorage.setItem("lessons", JSON.stringify(lessons));
      slot.innerHTML = `<div class="lesson">${nazwa}</div>`;
    };

    plan.appendChild(slot);
  }
});

}




// ===== FREKWENCJA =====

const lessonList = document.getElementById("lessonList");

if (lessonList) {

  // dane frekwencji dla dni
  const attendanceData = {
    pon: [
	  {name:"Wychowanie fizyczne", time:"07:20–08:05", status:"ok"},
      {name:"Wychowanie fizyczne", time:"08:15–09:00", status:"ok"},
      {name:"Administracja i eksploatacja sys.komp.", time:"09:10–09:55", status:"ok"},
      {name:"Administracja i eksploatacja sys.komp.", time:"10:05–10:50", status:"ok"},
	  {name:"Matematyka", time:"11:00-11:45", status:"ok"},
	  {name:"Fizyka", time:"12:05-12:50", status:"ok"},
	  {name:"J. Niemiecki", time:"13:00–13:45", status:"ok"},
	  {name:"Informatyka", time:"13:55-14:40", status:"ok"},
	  
    ],

    wt: [
      {name:"J. Niemiecki", time:"08:15–09:00", status:"ok"},
      {name:"Administracja i eksploatacja sys.komp.", time:"09:10–09:55", status:"ok"},
      {name:"Administracja i eksploatacja sys.komp.", time:"10:05–10:50", status:"ok"},
	  {name:"Matematyka", time:"11:00-11:45", status:"ok"},
	  {name:"Matematyka", time:"12:05-12:50", status:"ok"},
	  {name:"Chemia", time:"13:00–13:45", status:"ok"},
	  {name:"Fizyka", time:"13:55-14:40", status:"ok"},
    ],

    sr: [
      {name:"Matematyka", time:"09:10–09:55", status:"ok"},
      {name:"Historia", time:"10:05–10:50", status:"ok"},
	  {name:"Geografia", time:"11:00-11:45", status:"ok"},
	  {name:"Chemia", time:"12:05-12:50", status:"ok"},
	  {name:"Fizyka", time:"13:00–13:45", status:"ok"},
	  {name:"Zajęcia z wychowawcą", time:"13:55-14:40", status:"ok"},
    ],

    czw: [
    ],

    pt: [
    ]
  };

  const days = document.querySelectorAll(".day");

  // renderowanie lekcji
  function renderLessons(day) {
    lessonList.innerHTML = "";

    const lessons = attendanceData[day] || [];

    lessons.forEach(lesson => {
      lessonList.innerHTML += `
        <div class="lesson-row">
          <div class="status">
			${getStatusIcon(lesson.status)}
		  </div>

          <div>
            <div>${lesson.name}</div>
            <small>${lesson.time}</small>
          </div>
        </div>
      `;
    });
  }

  // kliknięcie dnia
  days.forEach(dayEl => {
    dayEl.addEventListener("click", () => {

      // usuń aktywne
      days.forEach(d => d.classList.remove("active"));

      // ustaw aktywny
      dayEl.classList.add("active");

      // zmień lekcje
      renderLessons(dayEl.dataset.day);
    });
  });

  // startowy dzień
  renderLessons("czw");
}
document.querySelectorAll('.locked').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Ta funkcja jest zablokowana');
  });
});
function getStatusIcon(status) {
  if (status === "ok") {
    return `<img src="img/smile.png" class="status-icon">`;
  }

  if (status === "late") {
    return "⏰";
  }

  if (status === "absent") {
    return "❌";
  }

  return "";
}
