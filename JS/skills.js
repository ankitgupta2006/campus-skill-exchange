const skillSearch = document.getElementById('skillSearch');
const skillCategory = document.getElementById('skillCategory');
const skillCards = [...document.querySelectorAll('.skill-card')];
const skillEmpty = document.getElementById('skillEmpty');
function filterSkills() {
  const query = (skillSearch?.value || '').trim().toLowerCase();
  const category = skillCategory?.value || 'all';
  let visible = 0;
  skillCards.forEach((card) => {
    const matchesText = card.textContent.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const show = matchesText && matchesCategory;
    card.hidden = !show;
    if (show) visible += 1;
  });
  if (skillEmpty) skillEmpty.hidden = visible !== 0;
}
skillSearch?.addEventListener('input', filterSkills);
skillCategory?.addEventListener('change', filterSkills);
