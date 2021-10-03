export class Api {

  sendForm(name, tel, email, text){
      this.name = name;
      this.tel = tel;
      this.email = email;
      this.text = text;
    return  fetch('http://api.sovet-consult.tk/form', {
          method: 'POST',
          credentials: "include",
          body: JSON.stringify({
            name: `${this.name}`,
            tel: `${this.tel}`,
            email: `${this.email}`,
            text: `${this.text}`
          }),
          headers: {
            "Content-Type": "application/json",
          },
      })
          .then((res) => {

              if (res.ok) {
                return res.json();
              }

                  return Promise.reject(` ${res.status}`);
            })
            .then((data) => {
              return data;
            })
            .catch((err) => {
              console.log(err);
              throw new Error(err)
            })

  };

}

