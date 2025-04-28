document.addEventListener("DOMContentLoaded" , () => {

    const navlinks = document.querySelectorAll('.nav-link');

    const sections = document.querySelectorAll('.content-section');
    
    function showSection(targetId){
        
        sections.forEach(section =>{
            section.classList.add('hidden');
        })
        
        console.log(navlinks)
        console.log(targetId);
        

        document.getElementById(targetId).classList.remove('hidden');

    }
    

    navlinks.forEach(link =>{
        link.addEventListener('click' , (event)=>{
            event.preventDefault();
            // const targetId = this.getAttribute('data-target');
            const targetId = event.currentTarget.getAttribute('data-target');
            showSection(targetId);
        })
    });

    showSection('student-main');
});