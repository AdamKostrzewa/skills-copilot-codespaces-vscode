function skillsMember() {
  const member = document.getElementById('member');
  if (member) {
    const memberSkills = document.getElementById('member-skills');
    const memberSkillsButton = document.getElementById('member-skills-button');
    const memberSkillsList = document.getElementById('member-skills-list');
    const memberSkillsListItems = document.querySelectorAll('#member-skills-list li');
    const memberSkillsListItemsArray = Array.from(memberSkillsListItems);

    memberSkillsButton.addEventListener('click', () => {
      memberSkills.classList.toggle('is-active');
      memberSkillsButton.classList.toggle('is-active');
    });

    memberSkillsListItemsArray.forEach((item) => {
      item.addEventListener('click', (event) => {
        const target = event.target;
        const targetClass = target.className;

        if (targetClass === 'skill') {
          target.classList.toggle('is-active');
        }
      });
    });
  }
}