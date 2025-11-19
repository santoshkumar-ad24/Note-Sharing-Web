const titleChange = document.getElementById('titleChange');
  const filesName = document.getElementById('filesName');

  titleChange.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      const title = filesName.value;
      if (!title) return alert('Please enter a valid title');

      titleChange.action = `/${title}`; // Set dynamic action
      titleChange.submit(); // Submit the form manually
    }
  });

