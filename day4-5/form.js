let blogs = [];
const month = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

function data(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const tech = document.getElementsByClassName('checkbox');
  const description = document.getElementById('description').value;
  const image = document.getElementById('upload');
  // const submit = document.getElementById('submit')
  // let project = document.getElementById('ul-card')

  const dateStart = new Date(startDate);
  const dateEnd = new Date(endDate);
  const durationTime = Math.abs(dateEnd - dateStart);
  const days = Math.ceil(durationTime / (1000 * 60 * 60 * 24));

  let val = [];

  for (let i = 0; i < tech.length; i++) {
    if (tech[i].checked === true) {
      if (tech[i].value === '0') {
        val.push(`<i class="fa-brands fa-2x fa-node-js"></i>`);
      } else if (tech[i].value === '1') {
        val.push(`<i class="fa-brands fa-2x fa-vuejs"></i>`);
      } else if (tech[i].value === '2') {
        val.push(`<i class="fa-brands fa-2x fa-react"></i>`);
      } else {
        val.push(`<i class="fa-brands fa-2x fa-python"></i>`);
      }
    }
  }

  console.log(val);

  let blog = {
    name: name,
    startDate: startDate,
    endDate: endDate,
    duration: days,
    description: description,
    postedAt: new Date(),
    tech: val.join(' '),
    image: URL.createObjectURL(image.files[0]),
  };

  if (blog.duration >= 7 && blog.duration <= 14) {
    blog.duration = '1 Minggu';
  } else if (blog.duration >= 14 && blog.duration <= 21) {
    blog.duration = '2 Minggu';
  } else if (blog.duration >= 21 && blog.duration <= 29) {
    blog.duration = '3 Minggu';
  } else if (blog.duration >= 29 && blog.duration <= 59) {
    blog.duration = '1 Bulan';
  } else if (blog.duration >= 60) {
    blog.duration = '2 Bulan ++';
  } else {
    blog.duration += ' Hari';
  }

  console.table(blog);
  console.log(tech);

  blogs.push(blog);

  writeHtml();

  alert('Project has been deployed succesfully');
}

function writeHtml() {
  let lengthData = blogs.length;
  let project = document.getElementById('ul-card');
  project.innerHTML = firstCard();
  for (let i = 0; i < lengthData; i++) {
    project.innerHTML += `<div class="card">
            <div class="card-image">
                <img src="${blogs[i].image}" alt="">
            </div>
            <div class="card-info">
                <div class="title-duration">
                    <h2 class="tittle" id="tittle">${blogs[i].name}</h2>
                    <p class="duration">Durasi: ${blogs[i].duration}</p>
                </div>
                <div class="description">
                   ${blogs[i].description}
                </div>
                <div class="card-icon">
                    <ul>
                        ${blogs[i].tech}
                    </ul>
                </div>
                <div class="btn-group">
                    <button type="button" class="card-btn edit-btn">Edit</button>
                    <button type="button" class="card-btn delete-btn">Delete</button>
                </div>
                <div class="time-upload">
                    <p>Diupload pada ${getFullTime(blogs[i].postedAt)}</p>
                </div>
            </div>
        </div>`;
  }
}

function getFullTime(time) {
  // merubah format waktu -> butuh waktu yang akan diubah
  console.log(time);

  const date = time.getDate();
  const monthIndex = time.getMonth();
  const year = time.getFullYear();

  const hour = time.getHours();
  let minute = time.getMinutes();

  if (minute < 10) {
    minute = '0' + minute;
  }

  return `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB `;
}

function getDistanceTime(time) {
  // console.log(typeof time);
  // selisih waktu saat ini - waktu postingan = selisih waktu
  const distance = new Date() - new Date(time);
  //convert to day
  const miliseconds = 1000;
  const secondInMinute = 60;
  const minuteInHour = 60;
  const secondInHour = secondInMinute * minuteInHour; // 3600
  const hourInDay = 23;

  let dayDistance = distance / (miliseconds * secondInHour * hourInDay);

  if (dayDistance >= 1) {
    const time = Math.floor(dayDistance) + ' day ago';
    return time;
  } else {
    let hourDistance = Math.floor(distance / (miliseconds * secondInHour));
    if (hourDistance > 0) {
      return hourDistance + ' hour ago';
    } else {
      let minuteDistance = Math.floor(
        distance / (miliseconds * secondInMinute)
      );
      return minuteDistance + ' minute ago';
    }
  }
}

setInterval(function () {
  writeHtml();
}, 2000);

function firstCard() {
  return `<div class="card">
    <div class="card-image">
        <img src="/img/blog-img.png" alt="">
    </div>
    <div class="card-info">
        <div class="title-duration">
            <h2 class="tittle" id="tittle">Lorem ipsum dolor sit amet</h2>
            <p class="duration">Durasi: 5 Hari</p>
        </div>
        <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis saepe reiciendis ab. Officiis maxime maiores ducimus ipsam, placeat illo dolorum cum eveniet? Esse saepe minus cumque natus ipsam eligendi numquam!
        </div>
        <div class="card-icon">
            <ul>
                <i class="fa-brands fa-2x fa-vuejs"></i>
                <i class="fa-brands fa-2x fa-node-js"></i>
                <i class="fa-brands fa-2x fa-python"></i>
            </ul>
        </div>
        <div class="btn-group">
            <button type="button" class="card-btn edit-btn">Edit</button>
            <button type="button" class="card-btn delete-btn">Delete</button>
        </div>
        <div class="time-upload">
            <p>Diupload pada 20 April 2022 15:29 WIB</p>
        </div>
    </div>
</div>`;
}
