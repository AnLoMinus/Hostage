// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
});

// Songs data structure
const songs = [
  {
    id: 1,
    title: "זעקת הבוקר",
    description: "תיאור הבוקר הקשה שבו נשברה השלווה, והעם קם למציאות חדשה.",
    content: null,
  },
  {
    id: 2,
    title: "שוועת הנפגעים",
    description: "תפילה להצלת פצועים וחיזוק נשמות שבורות.",
    content: null,
  },
  {
    id: 3,
    title: "למען אחי ורעי",
    description: "שיר על החטופים, זעקה מחודשת להחזרתם הביתה.",
    content: null,
  },
  {
    id: 4,
    title: "יושבי הסתר",
    description:
      "תפילה לחיילים המסתתרים בסבך הקרב, שיעמדו בגבורה וישובו בשלום.",
    content: null,
  },
  {
    id: 5,
    title: "תפילת הלבבות",
    description: "קריאה לאחדות הלבבות בעם, למרות השסעים והכאב.",
    content: null,
  },
  {
    id: 6,
    title: "לוחמי האור",
    description:
      "שיר המהלל את הגבורה של החיילים והמתנדבים שנלחמים להגן על העם.",
    content: null,
  },
  {
    id: 7,
    title: "שומרים על העיר",
    description: "תפילה להגנה על תושבי הדרום והגבולות.",
    content: null,
  },
  {
    id: 8,
    title: "זכרון הנופלים",
    description: "קינה על הנופלים, בקשה שהעם לא ישכח את שמם לעולם.",
    content: null,
  },
  {
    id: 9,
    title: "תחינה בשבי",
    description:
      "שירה הנושאת תחינה לאלה שנמצאים בשבי, שישמרו על רוחם ולא יישברו.",
    content: null,
  },
  {
    id: 10,
    title: "תשועת ענווים",
    description: "קריאה לתשועת ה', שיבוא להציל את החלשים והנזקקים.",
    content: null,
  },
  {
    id: 11,
    title: "שלום למשפחותיהם",
    description: "שיר של נחמה למשפחות הפצועים והחטופים, שהשקט ישוב אל ביתם.",
    content: null,
  },
  {
    id: 12,
    title: "ברכת הניצחון",
    description: "תפילה שהחיילים יצליחו במשימתם וישובו עטורי ניצחון.",
    content: null,
  },
  {
    id: 13,
    title: "שובו אחים",
    description: "בקשה מחודשת להחזרת החטופים לעם ולמשפחותיהם.",
    content: null,
  },
  {
    id: 14,
    title: "שיר אמונה",
    description: "חיזוק האמונה באל, גם בזמנים של חושך.",
    content: null,
  },
  {
    id: 15,
    title: "ילדים ותקווה",
    description: "שיר על דור הילדים, תפילה שישמרו על שמחתם גם בזמנים קשים.",
    content: null,
  },
  {
    id: 16,
    title: "אור בשערים",
    description: "שיר המהלל את רגעי האור הקטנים בתוך האפלה.",
    content: null,
  },
  {
    id: 17,
    title: "שירת השלום",
    description: "קריאה נואשת לשלום שיגיע לאחר כל המאבקים.",
    content: null,
  },
  {
    id: 18,
    title: "סוף התקווה – תחילתה",
    description: "סיום המסע בכמיהה לעתיד טוב יותר, שבו תפילות אלה יתגשמו.",
    content: null,
  },
];

// Load songs into grid
function loadSongsGrid() {
  const songsContainer = document.querySelector("#songs .row");
  // נקה את התוכן הקיים
  songsContainer.innerHTML = "";

  // הוסף את כל השירים
  songs.forEach((song) => {
    const songCard = `
      <div class="col-md-6 col-lg-4" data-aos="fade-up">
        <div class="card song-card h-100">
          <div class="card-body">
            <h5 class="card-title">${song.title}</h5>
            <p class="card-text">${song.description}</p>
            <button class="btn btn-outline-primary read-more" data-song="${song.id}">
              קרא עוד <i class="fas fa-arrow-left me-2"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    songsContainer.innerHTML += songCard;
  });
}

// Handle song modal
async function openSongModal(songId) {
  const song = songs.find((s) => s.id === songId);
  if (!song.content) {
    // Load song content if not already loaded
    try {
      const response = await fetch(`${songId}.md`);
      const text = await response.text();
      song.content = text;
    } catch (error) {
      console.error("Error loading song content:", error);
      return;
    }
  }

  const modal = new bootstrap.Modal(document.getElementById("songModal"));
  document.querySelector("#songModal .modal-title").textContent = song.title;
  document.querySelector("#songModal .modal-body").innerHTML =
    formatSongContent(song.content);
  modal.show();
}

// Format song content from markdown to HTML
function formatSongContent(markdown) {
  return (
    markdown
      // כותרות
      .replace(/^### (.+)$/gm, '<h3 class="song-title mb-4">$1</h3>')

      // טקסט מודגש
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")

      // פסקאות שירה (מתחילות ב >)
      .replace(/^> (.+)$/gm, '<div class="verse">$1</div>')

      // מעבר שורה כפול
      .replace(/\n\n/g, "<br>")

      // קו מפריד
      .replace(/^---$/gm, '<hr class="song-divider">')

      // פזמון
      .replace(
        /^> \*\*פזמון\*\*/gm,
        '<div class="chorus"><strong>פזמון</strong>'
      )

      // סגירת פזמון (אחרי השורה הבאה שמתחילה ב >)
      .replace(/(^> .+\n)(?!> )/gm, "$1</div>")
  );
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  loadSongsGrid();

  // Handle song card clicks
  document.querySelector("#songs").addEventListener("click", (e) => {
    if (
      e.target.classList.contains("read-more") ||
      e.target.closest(".read-more")
    ) {
      const button = e.target.classList.contains("read-more")
        ? e.target
        : e.target.closest(".read-more");
      const songId = parseInt(button.dataset.song);
      openSongModal(songId);
    }
  });

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Add scroll-based navbar color change
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("bg-white", "shadow");
  } else {
    navbar.classList.remove("bg-white", "shadow");
  }
});
