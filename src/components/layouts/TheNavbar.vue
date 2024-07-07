<template>
  <nav class="navbar navbar-expand fixed-top bg-red" style="height: 80px">
    <div class="container-fluid overflow-hidden">
      <div style="width: 150px; height: 70px; transform: translateY(-25px)">
        <img src="../../assets/logo5.png" alt="pino-logo" class="img-fluid" />
      </div>
      <a
        class="navbar-toggler d-block d-md-none border-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas"
        aria-controls="offcanvas"
      >
        <span class="navbar-toggler-icon"></span>
      </a>
      <div class="navbar-nav d-none d-md-flex align-items-center">
        <router-link
          to="/dogs"
          class="nav-link text-center d-flex flex-column align-items-center justify-content-center px-3"
          :class="{ active: route.path === '/dogs' }"
          ><span id="dog"></span><span>Psi</span></router-link
        >
        <router-link
          to="/cats"
          class="nav-link text-center d-flex flex-column align-items-center justify-content-center px-3"
          :class="{ active: route.path === '/cats' }"
          ><span id="cat"></span><span>Mačke</span></router-link
        ><router-link
          to="/news"
          class="nav-link text-center d-flex flex-column align-items-center justify-content-center px-3"
          :class="{ active: route.path === '/news' }"
          ><span id="news"></span><span>Novosti</span></router-link
        >
      </div>
    </div>
  </nav>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvas"
    aria-labelledby="offcanvasLabel"
  >
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <a
      class="d-flex align-items-center justify-content-center position-sticky top-0 logo"
    >
      <img
        src="../../assets/logo5.png"
        style="width: 220px; height: fit-content"
      />
    </a>

    <ul class="navbar-nav align-items-center">
      <li class="nav-item mb-3" data-bs-dismiss="offcanvas">
        <router-link
          to="/dogs"
          class="nav-link text-center d-flex flex-column align-items-center justify-content-center px-3"
          :class="{ active: route.path === '/dogs' }"
          ><span id="dog"></span><span>Psi</span></router-link
        >
      </li>
      <li class="nav-item mb-3" data-bs-dismiss="offcanvas">
        <router-link
          to="/cats"
          class="nav-link text-center d-flex flex-column align-items-center justify-content-center px-3"
          :class="{ active: route.path === '/cats' }"
          ><span id="cat"></span><span>Mačke</span></router-link
        >
      </li>
      <li class="nav-item mb-3" data-bs-dismiss="offcanvas">
        <router-link
          to="/news"
          class="nav-link text-center d-flex flex-column align-items-center justify-content-center px-3"
          :class="{ active: route.path === '/news' }"
          ><span id="news"></span><span>Novosti</span></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped>
.navbar {
  --bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%28255, 255, 255, 1%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e");
  --bs-navbar-toggler-border-color: #ffffff;
}

#offcanvas {
  width: 300px;
  background-color: var(--red-color);
}

.btn-close {
  --bs-btn-close-color: #ffffff;
}

a,
li {
  color: #f5f5f5 !important;
}

.nav-link.active #dog::before,
.nav-link:focus #dog::before,
.nav-link:hover #dog::before {
  background-image: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.15452 1.01195C5.11987 1.32041 7.17569 2.2474 8.72607 3.49603C9.75381 3.17407 10.8558 2.99995 12 2.99995C13.1519 2.99995 14.261 3.17641 15.2946 3.5025C16.882 2.27488 18.8427 1.31337 20.8354 1.01339C21.2596 0.95092 21.7008 1.16534 21.8945 1.55273C22.6719 3.38958 22.6983 5.57987 22.2202 7.49248L22.2128 7.52213C22.0847 8.03536 21.9191 8.69868 21.3876 8.92182C21.7827 9.89315 22 10.9466 22 12.0526C22 14.825 20.8618 17.6774 19.8412 20.2348L19.8412 20.2348L19.7379 20.4936C19.1182 22.0486 17.7316 23.1196 16.125 23.418L13.8549 23.8397C13.1549 23.9697 12.4562 23.7172 12 23.2082C11.5438 23.7172 10.8452 23.9697 10.1452 23.8397L7.87506 23.418C6.26852 23.1196 4.88189 22.0486 4.26214 20.4936L4.15891 20.2348C3.13833 17.6774 2.00004 14.825 2.00004 12.0526C2.00004 10.9466 2.21737 9.89315 2.6125 8.92182C2.08046 8.69845 1.91916 8.05124 1.7909 7.53658L1.7799 7.49248C1.32311 5.66527 1.23531 3.2968 2.10561 1.55273C2.29827 1.16741 2.72906 0.945855 3.15452 1.01195ZM6.58478 4.44052C5.45516 5.10067 4.47474 5.9652 3.71373 6.98132C3.41572 5.76461 3.41236 4.41153 3.67496 3.18754C4.68842 3.48029 5.68018 3.89536 6.58478 4.44052ZM20.2863 6.98133C19.5303 5.97184 18.5577 5.11195 17.4374 4.45347C18.3364 3.9005 19.3043 3.45749 20.3223 3.17455C20.5884 4.40199 20.5853 5.76068 20.2863 6.98133ZM8.85364 5.56694C9.81678 5.20285 10.8797 4.99995 12 4.99995C13.1204 4.99995 14.1833 5.20285 15.1464 5.56694C18.0554 6.66661 20 9.1982 20 12.0526C20 14.4676 18.9891 16.9876 18.0863 19.238L18.0862 19.2382C18.0167 19.4115 17.9478 19.5832 17.8801 19.7531C17.5291 20.6338 16.731 21.2712 15.7597 21.4516L13.4896 21.8733L12.912 20.5896C12.7505 20.2307 12.3935 19.9999 12 19.9999C11.6065 19.9999 11.2496 20.2307 11.0881 20.5896L10.5104 21.8733L8.24033 21.4516C7.26908 21.2712 6.471 20.6338 6.12001 19.7531C6.05237 19.5834 5.98357 19.4119 5.91414 19.2388L5.91395 19.2384L5.91381 19.238C5.01102 16.9876 4.00004 14.4676 4.00004 12.0526C4.00004 9.1982 5.94472 6.66661 8.85364 5.56694ZM10.5 15.9999C10.1212 15.9999 9.77497 16.2139 9.60557 16.5527C9.43618 16.8915 9.47274 17.2969 9.7 17.5999L11.2 19.5999C11.3889 19.8517 11.6852 19.9999 12 19.9999C12.3148 19.9999 12.6111 19.8517 12.8 19.5999L14.3 17.5999C14.5273 17.2969 14.5638 16.8915 14.3944 16.5527C14.225 16.2139 13.8788 15.9999 13.5 15.9999H10.5ZM9.62134 11.1212C9.62134 11.9497 8.94977 12.6212 8.12134 12.6212C7.29291 12.6212 6.62134 11.9497 6.62134 11.1212C6.62134 10.2928 7.29291 9.62125 8.12134 9.62125C8.94977 9.62125 9.62134 10.2928 9.62134 11.1212ZM16 12.4999C16.8284 12.4999 17.5 11.8284 17.5 10.9999C17.5 10.1715 16.8284 9.49994 16 9.49994C15.1716 9.49994 14.5 10.1715 14.5 10.9999C14.5 11.8284 15.1716 12.4999 16 12.4999Z' fill='%23ffffff'%3E%3C/path%3E%3C/svg%3E") !important;
}

.nav-link.active #cat::before,
.nav-link:focus #cat::before,
.nav-link:hover #cat::before {
  background-image: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.03675 2.49516C3.262 2.10996 3.7152 1.92062 4.14754 2.03109C5.97557 2.49817 7.55118 3.2517 9.03129 4.3653C9.96974 4.05942 10.9671 3.8947 12 3.8947C13.0328 3.8947 14.0302 4.05942 14.9687 4.3653C16.4488 3.2517 18.0244 2.49817 19.8524 2.03109C20.2848 1.92062 20.738 2.10996 20.9632 2.49516C21.6136 3.60735 21.682 4.84507 21.5423 5.95618C21.4242 6.89524 21.1479 7.81637 20.8761 8.60644C21.5951 10.0574 22 11.7048 22 13.4473C22 14.0796 21.9465 14.6779 21.8433 15.242L22.7737 15.0259C23.3117 14.9009 23.8491 15.2357 23.974 15.7737C24.099 16.3117 23.7642 16.8491 23.2262 16.974L21.0977 17.4685C20.7875 18.072 20.4027 18.6166 19.9517 19.1014L20.6281 19.7012C21.0414 20.0677 21.0793 20.6997 20.7129 21.1129C20.3465 21.5261 19.7144 21.5641 19.3012 21.1976L18.3886 20.3884C16.6081 21.5099 14.358 22 12 22C9.64192 22 7.39187 21.5099 5.61135 20.3884L4.69872 21.1977C4.2855 21.5641 3.65348 21.5261 3.28705 21.1129C2.92063 20.6997 2.95856 20.0677 3.37179 19.7012L4.04822 19.1014C3.59721 18.6166 3.21244 18.072 2.90229 17.4685L0.773707 16.974C0.235747 16.8491 -0.0990517 16.3117 0.0259144 15.7737C0.150881 15.2357 0.688289 14.9009 1.22625 15.0259L2.15669 15.242C2.05349 14.6779 1.99998 14.0796 1.99998 13.4473C1.99998 11.7048 2.40488 10.0574 3.12385 8.60644C2.85211 7.81637 2.57578 6.89524 2.45771 5.95618C2.318 4.84507 2.38635 3.60735 3.03675 2.49516ZM19.6556 15.7502L16.3923 16.5082C16.028 16.5929 15.7414 16.8737 15.6494 17.2363C15.5573 17.5988 15.6753 17.9824 15.9551 18.2305L16.8095 18.9881C15.5088 19.6568 13.8601 20 12 20C10.1399 20 8.49112 19.6568 7.19043 18.9881L8.04479 18.2305C8.32463 17.9824 8.44261 17.5988 8.35058 17.2363C8.25855 16.8738 7.97191 16.5929 7.60759 16.5083L4.34436 15.7502C4.12161 15.0798 3.99998 14.3155 3.99998 13.4473C3.99998 11.8822 4.39737 10.4207 5.08744 9.16612C5.22557 8.915 5.24931 8.61669 5.15264 8.34688C4.84532 7.48912 4.55212 6.58184 4.44208 5.70667C4.37247 5.15308 4.3816 4.65327 4.48556 4.21124C5.85937 4.66259 7.05992 5.32724 8.21953 6.26906C8.49981 6.49669 8.88102 6.55556 9.21691 6.42307C10.0831 6.08142 11.0202 5.8947 12 5.8947C12.9798 5.8947 13.9169 6.08142 14.7831 6.42307C15.1189 6.55556 15.5002 6.49669 15.7804 6.26906C16.94 5.32724 18.1406 4.66259 19.5144 4.21124C19.6184 4.65327 19.6275 5.15308 19.5579 5.70667C19.4478 6.58184 19.1546 7.48912 18.8473 8.34688C18.7506 8.61669 18.7744 8.915 18.9125 9.16612C19.6026 10.4207 20 11.8822 20 13.4473C20 14.3155 19.8784 15.0798 19.6556 15.7502ZM16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1715 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1715 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5ZM8.12132 13.6213C8.94974 13.6213 9.62132 12.9497 9.62132 12.1213C9.62132 11.2928 8.94974 10.6213 8.12132 10.6213C7.29289 10.6213 6.62132 11.2928 6.62132 12.1213C6.62132 12.9497 7.29289 13.6213 8.12132 13.6213ZM11 15C10.5955 15 10.2309 15.2436 10.0761 15.6173C9.92132 15.991 10.0069 16.4211 10.2929 16.7071L11.2929 17.7071C11.6834 18.0976 12.3166 18.0976 12.7071 17.7071L13.7071 16.7071C13.9931 16.4211 14.0786 15.991 13.9239 15.6173C13.7691 15.2436 13.4044 15 13 15H11Z' fill='%23ffffff'%3E%3C/path%3E%3C/g%3E%3C/svg%3E") !important;
}

.nav-link.active #news::before,
.nav-link:focus #news::before,
.nav-link:hover #news::before {
  background-image: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 32 32' enable-background='new 0 0 32 32' id='Stock_cut' version='1.1' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cdesc%3E%3C/desc%3E%3Cg%3E%3Cpath d='M27,5V3H1v26 c0,1.105,0.895,2,2,2h26c1.105,0,2-0.895,2-2V5H27z' fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2'%3E%3C/path%3E%3Crect fill='none' height='8' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' width='10' x='5' y='19'%3E%3C/rect%3E%3Cline fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='27' x2='27' y1='5' y2='24'%3E%3C/line%3E%3Cline fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='27' x2='27' y1='26' y2='28'%3E%3C/line%3E%3Cline fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='4' x2='24' y1='11' y2='11'%3E%3C/line%3E%3Cline fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='4' x2='24' y1='7' y2='7'%3E%3C/line%3E%3Cline fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='4' x2='24' y1='15' y2='15'%3E%3C/line%3E%3Cline fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='18' x2='24' y1='19' y2='19'%3E%3C/line%3E%3Cline fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='18' x2='24' y1='23' y2='23'%3E%3C/line%3E%3Cline fill='none' stroke='%23ffffff' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='18' x2='24' y1='27' y2='27'%3E%3C/line%3E%3C/g%3E%3C/g%3E%3C/svg%3E") !important;
}

#dog::before,
#cat::before,
#news::before {
  content: "";
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  width: 32px;
  height: 32px;
}

#dog::before {
  background-image: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.15452 1.01195C5.11987 1.32041 7.17569 2.2474 8.72607 3.49603C9.75381 3.17407 10.8558 2.99995 12 2.99995C13.1519 2.99995 14.261 3.17641 15.2946 3.5025C16.882 2.27488 18.8427 1.31337 20.8354 1.01339C21.2596 0.95092 21.7008 1.16534 21.8945 1.55273C22.6719 3.38958 22.6983 5.57987 22.2202 7.49248L22.2128 7.52213C22.0847 8.03536 21.9191 8.69868 21.3876 8.92182C21.7827 9.89315 22 10.9466 22 12.0526C22 14.825 20.8618 17.6774 19.8412 20.2348L19.8412 20.2348L19.7379 20.4936C19.1182 22.0486 17.7316 23.1196 16.125 23.418L13.8549 23.8397C13.1549 23.9697 12.4562 23.7172 12 23.2082C11.5438 23.7172 10.8452 23.9697 10.1452 23.8397L7.87506 23.418C6.26852 23.1196 4.88189 22.0486 4.26214 20.4936L4.15891 20.2348C3.13833 17.6774 2.00004 14.825 2.00004 12.0526C2.00004 10.9466 2.21737 9.89315 2.6125 8.92182C2.08046 8.69845 1.91916 8.05124 1.7909 7.53658L1.7799 7.49248C1.32311 5.66527 1.23531 3.2968 2.10561 1.55273C2.29827 1.16741 2.72906 0.945855 3.15452 1.01195ZM6.58478 4.44052C5.45516 5.10067 4.47474 5.9652 3.71373 6.98132C3.41572 5.76461 3.41236 4.41153 3.67496 3.18754C4.68842 3.48029 5.68018 3.89536 6.58478 4.44052ZM20.2863 6.98133C19.5303 5.97184 18.5577 5.11195 17.4374 4.45347C18.3364 3.9005 19.3043 3.45749 20.3223 3.17455C20.5884 4.40199 20.5853 5.76068 20.2863 6.98133ZM8.85364 5.56694C9.81678 5.20285 10.8797 4.99995 12 4.99995C13.1204 4.99995 14.1833 5.20285 15.1464 5.56694C18.0554 6.66661 20 9.1982 20 12.0526C20 14.4676 18.9891 16.9876 18.0863 19.238L18.0862 19.2382C18.0167 19.4115 17.9478 19.5832 17.8801 19.7531C17.5291 20.6338 16.731 21.2712 15.7597 21.4516L13.4896 21.8733L12.912 20.5896C12.7505 20.2307 12.3935 19.9999 12 19.9999C11.6065 19.9999 11.2496 20.2307 11.0881 20.5896L10.5104 21.8733L8.24033 21.4516C7.26908 21.2712 6.471 20.6338 6.12001 19.7531C6.05237 19.5834 5.98357 19.4119 5.91414 19.2388L5.91395 19.2384L5.91381 19.238C5.01102 16.9876 4.00004 14.4676 4.00004 12.0526C4.00004 9.1982 5.94472 6.66661 8.85364 5.56694ZM10.5 15.9999C10.1212 15.9999 9.77497 16.2139 9.60557 16.5527C9.43618 16.8915 9.47274 17.2969 9.7 17.5999L11.2 19.5999C11.3889 19.8517 11.6852 19.9999 12 19.9999C12.3148 19.9999 12.6111 19.8517 12.8 19.5999L14.3 17.5999C14.5273 17.2969 14.5638 16.8915 14.3944 16.5527C14.225 16.2139 13.8788 15.9999 13.5 15.9999H10.5ZM9.62134 11.1212C9.62134 11.9497 8.94977 12.6212 8.12134 12.6212C7.29291 12.6212 6.62134 11.9497 6.62134 11.1212C6.62134 10.2928 7.29291 9.62125 8.12134 9.62125C8.94977 9.62125 9.62134 10.2928 9.62134 11.1212ZM16 12.4999C16.8284 12.4999 17.5 11.8284 17.5 10.9999C17.5 10.1715 16.8284 9.49994 16 9.49994C15.1716 9.49994 14.5 10.1715 14.5 10.9999C14.5 11.8284 15.1716 12.4999 16 12.4999Z' fill='%23000000'%3E%3C/path%3E%3C/svg%3E");
}

#cat::before {
  background-image: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M3.03675 2.49516C3.262 2.10996 3.7152 1.92062 4.14754 2.03109C5.97557 2.49817 7.55118 3.2517 9.03129 4.3653C9.96974 4.05942 10.9671 3.8947 12 3.8947C13.0328 3.8947 14.0302 4.05942 14.9687 4.3653C16.4488 3.2517 18.0244 2.49817 19.8524 2.03109C20.2848 1.92062 20.738 2.10996 20.9632 2.49516C21.6136 3.60735 21.682 4.84507 21.5423 5.95618C21.4242 6.89524 21.1479 7.81637 20.8761 8.60644C21.5951 10.0574 22 11.7048 22 13.4473C22 14.0796 21.9465 14.6779 21.8433 15.242L22.7737 15.0259C23.3117 14.9009 23.8491 15.2357 23.974 15.7737C24.099 16.3117 23.7642 16.8491 23.2262 16.974L21.0977 17.4685C20.7875 18.072 20.4027 18.6166 19.9517 19.1014L20.6281 19.7012C21.0414 20.0677 21.0793 20.6997 20.7129 21.1129C20.3465 21.5261 19.7144 21.5641 19.3012 21.1976L18.3886 20.3884C16.6081 21.5099 14.358 22 12 22C9.64192 22 7.39187 21.5099 5.61135 20.3884L4.69872 21.1977C4.2855 21.5641 3.65348 21.5261 3.28705 21.1129C2.92063 20.6997 2.95856 20.0677 3.37179 19.7012L4.04822 19.1014C3.59721 18.6166 3.21244 18.072 2.90229 17.4685L0.773707 16.974C0.235747 16.8491 -0.0990517 16.3117 0.0259144 15.7737C0.150881 15.2357 0.688289 14.9009 1.22625 15.0259L2.15669 15.242C2.05349 14.6779 1.99998 14.0796 1.99998 13.4473C1.99998 11.7048 2.40488 10.0574 3.12385 8.60644C2.85211 7.81637 2.57578 6.89524 2.45771 5.95618C2.318 4.84507 2.38635 3.60735 3.03675 2.49516ZM19.6556 15.7502L16.3923 16.5082C16.028 16.5929 15.7414 16.8737 15.6494 17.2363C15.5573 17.5988 15.6753 17.9824 15.9551 18.2305L16.8095 18.9881C15.5088 19.6568 13.8601 20 12 20C10.1399 20 8.49112 19.6568 7.19043 18.9881L8.04479 18.2305C8.32463 17.9824 8.44261 17.5988 8.35058 17.2363C8.25855 16.8738 7.97191 16.5929 7.60759 16.5083L4.34436 15.7502C4.12161 15.0798 3.99998 14.3155 3.99998 13.4473C3.99998 11.8822 4.39737 10.4207 5.08744 9.16612C5.22557 8.915 5.24931 8.61669 5.15264 8.34688C4.84532 7.48912 4.55212 6.58184 4.44208 5.70667C4.37247 5.15308 4.3816 4.65327 4.48556 4.21124C5.85937 4.66259 7.05992 5.32724 8.21953 6.26906C8.49981 6.49669 8.88102 6.55556 9.21691 6.42307C10.0831 6.08142 11.0202 5.8947 12 5.8947C12.9798 5.8947 13.9169 6.08142 14.7831 6.42307C15.1189 6.55556 15.5002 6.49669 15.7804 6.26906C16.94 5.32724 18.1406 4.66259 19.5144 4.21124C19.6184 4.65327 19.6275 5.15308 19.5579 5.70667C19.4478 6.58184 19.1546 7.48912 18.8473 8.34688C18.7506 8.61669 18.7744 8.915 18.9125 9.16612C19.6026 10.4207 20 11.8822 20 13.4473C20 14.3155 19.8784 15.0798 19.6556 15.7502ZM16 13.5C16.8284 13.5 17.5 12.8284 17.5 12C17.5 11.1715 16.8284 10.5 16 10.5C15.1716 10.5 14.5 11.1715 14.5 12C14.5 12.8284 15.1716 13.5 16 13.5ZM8.12132 13.6213C8.94974 13.6213 9.62132 12.9497 9.62132 12.1213C9.62132 11.2928 8.94974 10.6213 8.12132 10.6213C7.29289 10.6213 6.62132 11.2928 6.62132 12.1213C6.62132 12.9497 7.29289 13.6213 8.12132 13.6213ZM11 15C10.5955 15 10.2309 15.2436 10.0761 15.6173C9.92132 15.991 10.0069 16.4211 10.2929 16.7071L11.2929 17.7071C11.6834 18.0976 12.3166 18.0976 12.7071 17.7071L13.7071 16.7071C13.9931 16.4211 14.0786 15.991 13.9239 15.6173C13.7691 15.2436 13.4044 15 13 15H11Z' fill='%23000000'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
}

#news::before {
  background-image: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 32 32' enable-background='new 0 0 32 32' id='Stock_cut' version='1.1' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cdesc%3E%3C/desc%3E%3Cg%3E%3Cpath d='M27,5V3H1v26 c0,1.105,0.895,2,2,2h26c1.105,0,2-0.895,2-2V5H27z' fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2'%3E%3C/path%3E%3Crect fill='none' height='8' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' width='10' x='5' y='19'%3E%3C/rect%3E%3Cline fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='27' x2='27' y1='5' y2='24'%3E%3C/line%3E%3Cline fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='27' x2='27' y1='26' y2='28'%3E%3C/line%3E%3Cline fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='4' x2='24' y1='11' y2='11'%3E%3C/line%3E%3Cline fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='4' x2='24' y1='7' y2='7'%3E%3C/line%3E%3Cline fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='4' x2='24' y1='15' y2='15'%3E%3C/line%3E%3Cline fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='18' x2='24' y1='19' y2='19'%3E%3C/line%3E%3Cline fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='18' x2='24' y1='23' y2='23'%3E%3C/line%3E%3Cline fill='none' stroke='%23000000' stroke-linejoin='round' stroke-miterlimit='10' stroke-width='2' x1='18' x2='24' y1='27' y2='27'%3E%3C/line%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
