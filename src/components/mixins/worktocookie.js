export const worktocookie = {
    data(){
      return {
      }
    },
    methods: {
    set_cookie(name, value, days)
    { 
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*12));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    getCookie(name)
    { 
        var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    delete_cookie(cookie_name)
    { 
        var cookie_date = new Date ( );  // Текущая дата и время
        cookie_date.setTime ( cookie_date.getTime() - 1 );
        document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
    },
    }
  }
  