const profile = document.getElementById('profile');

profile.innerHTML = `
    <div class="titel h-[7rem] bg-[#e0e1dd] shadow-lg ">
        <div class="title-name flex justify-items-start items-center h-[100%] pl-[5rem] max-sm:pl-[2rem] text-3xl font-bold  ">
            <h1>Profile</h1>
        </div>
    </div>
    <div class="flex justify-center items-center min-h-[100vh] max-sm:ml-2 max-sm:mr-2  h-auto m-6 text-lg text-[#1b263b]">
      <div class="h-auto  w-[60%] max-sm:w-full ">
        <div class="max-w-8xl flex h-auto w-full flex-wrap justify-between gap-6  p-6  backdrop-blur-lg">
          <div class="w-full max-w-4xl rounded-lg bg-gray-200  p-6 shadow-md  ">
            <h2 class="p-4  rounded-lg  text-lg max-sm:text-2xl font-semibold bg-[#415a77] text-[#e0e1dd]">Your Information</h2>
            <div class="w-full max-w-3xl rounded-b-lg bg-gray-200 pt-6 pb-6 text-xl max-sm:text-2xl">
            <form class="space-y-4">
            <div>
                <label class="mb-2 block text-gray-700" for="name">Name</label>
                <div class="flex space-x-2 max-sm:flex-col max-sm:gap-4">
                    <input type="text" id="firstName" placeholder="josh" class="flex-1 max-sm:flex-col rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
                    <input type="text" id="lastName" placeholder="prajapat" class="flex-1 max-sm:flex-col rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
                </div>
            </div>

            <div>
                <label class="mb-2 block   text-gray-700" for="groupName">userName</label>
                <input type="text" id="username" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
            </div>

            <div>
              <label class="mb-2 block  text-gray-700" for="email">Email</label>
              <input type="email" id="email" placeholder="josprajapat@gmail.com" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
            </div>

            <div>
              <label class="mb-2 block   text-gray-700" for="mobilePhone">Mobile Phone</label>
              <input type="tel" id="mobilePhone" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
            </div>

            <div>
               <label class="mb-2 block   text-gray-700" for="parentsPhone">Parent Phone</label>
               <input type="tel" id="parentsPhone" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
            </div>
            <div>
               <label class="mb-2 block   text-gray-700" for="classAssigned">classAssigned</label>
               <input type="tel" id="classAssigned" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
            </div>
            <div>
                <label class="mb-2 block   text-gray-700">Address</label>
                <input id="street" type="text" placeholder="Street" class="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
                <input id="addressLine2" type="text" placeholder="addressLine2" class="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
                <div class="flex max-sm:flex-col max-sm:gap-2.5 space-x-2">
                    <input type="text" placeholder="City" id="city" class="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
                    <div class = " w-full flex justify-center gap-2">
                        <input type="text" placeholder="State" id="state" class="focus:ring-[#415a77]focus:outline-none w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none" / disabled>
                        <input type="text" placeholder="Zip Code" id="zipCode" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
                    </div>
                </div>
            </div>

            <div>
               <label class="mb-2 block   text-gray-700" for="bioNotes">classAssigned</label>
               <input type="tel" id="bioNotes" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#415a77] focus:outline-none" / disabled>
            </div>

            
        </form>
    </div>
    </div>
</div>
</div>
</div>
`;