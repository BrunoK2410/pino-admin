import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

export function useTableDataHandling(
  getFunction,
  type,
  iconArray,
  visibilityArray,
  headers,
  propertyNames
) {
  const isLoading = ref(true);

  const route = useRoute();

  let controllers = [];

  const items = ref([]);
  const initialItems = ref([]);
  const totalItems = ref("");

  const fetchFunction = async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      controllers.push(controller);
      const data = await getFunction(type, signal);
      items.value = Array.isArray(data) ? data : [data];
      totalItems.value = [...items.value];
      initialItems.value = [...items.value];
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };

  const formatValue = (value, property) => {
    if (property === "category") {
      if (!value) return "";
      let joinedString = value.join(",");

      const replacements = {
        "in-memoriam": "In-memoriam",
        adopted: "Udomljen",
        [route.name === "Cats" ? "kitten" : "puppy"]:
          route.name === "Cats" ? "Mačići" : "Štene",
        young: "Mladi",
        adult: "Odrasli",
        old: "Stari",
        "permanent-care": "Na trajnom čuvanju",
        disabled: "Invalidni",
      };

      for (const [key, replacement] of Object.entries(replacements)) {
        if (joinedString.includes(key)) {
          joinedString = joinedString.replace(
            new RegExp(key, "g"),
            replacement
          );
        }
      }

      return joinedString;
    } else if (property === "treatment") {
      if (!value) {
        return "";
      }
      let joinedString = value.join(",");
      let modifiedString = joinedString
        .split(",")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(",");
      return modifiedString;
    } else if (property === "gender") {
      if (value === "F") {
        return "Ž";
      } else return value;
    } else if (property === "timestamp") {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } else return value;
  };

  const searchInput = ref("");

  const searchableProperties = propertyNames.filter(
    (property) => property !== "images"
  );

  const slicedItems = computed(() => {
    let filtered = [...items.value];
    if (searchInput.value !== "") {
      filtered = items.value.filter((item) =>
        searchableProperties.some((property) => {
          return formatValue(item[property], property)
            .toString()
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());
        })
      );
    }
    getFilteredLength(filtered);
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filtered.slice(startIndex, endIndex);
  });

  const getFilteredLength = (filtered) => {
    totalItems.value = [...filtered];
  };

  const sortIcon = ref(iconArray);
  const isVisible = ref(visibilityArray);

  function setSortIcon(eventData) {
    const index = eventData.index;
    const isHovered = eventData.value;
    if (isHovered && sortIcon.value[index] === 1) {
      sortIcon.value[index] = 1;
      isVisible.value[index] = true;
    } else if (!isHovered && sortIcon.value[index] === 1) {
      isVisible.value[index] = false;
    }
  }

  function parseDate(dateString) {
    if (!dateString) return new Date(0);

    const [day, month, year] = dateString.split(".").map(Number);
    return new Date(year, month - 1, day);
  }

  const toggleSortIcon = (eventData) => {
    const index = eventData.index;
    const sortSubject = eventData.header;

    if (sortIcon.value[index] === 1) {
      sortIcon.value[index] = 2;
      for (let i = 0; i < sortIcon.value.length; i++) {
        if (i !== index && sortIcon.value[i] > 1) {
          sortIcon.value[i] = 1;
          isVisible.value[i] = false;
        }
      }

      items.value.sort((a, b) => {
        const formattedA = formatValue(
          a[propertyNames[index]],
          propertyNames[index]
        );
        const formattedB = formatValue(
          b[propertyNames[index]],
          propertyNames[index]
        );
        if (sortSubject === "ROĐENDAN") {
          const dateA = parseDate(a[propertyNames[index]]);
          const dateB = parseDate(b[propertyNames[index]]);
          return dateA - dateB;
        } else if (sortSubject === "DATUM OBJAVE") {
          const dateA = new Date(a[propertyNames[index]]);
          const dateB = new Date(b[propertyNames[index]]);
          return dateA - dateB;
        } else {
          return formattedA.localeCompare(formattedB);
        }
      });
    } else if (sortIcon.value[index] === 2) {
      sortIcon.value[index] = 3;
      items.value.sort((a, b) => {
        const formattedA = formatValue(
          a[propertyNames[index]],
          propertyNames[index]
        );
        const formattedB = formatValue(
          b[propertyNames[index]],
          propertyNames[index]
        );
        if (sortSubject === "ROĐENDAN") {
          const dateA = parseDate(a[propertyNames[index]]);
          const dateB = parseDate(b[propertyNames[index]]);
          return dateB - dateA;
        } else if (sortSubject === "DATUM OBJAVE") {
          const dateA = new Date(a[propertyNames[index]]);
          const dateB = new Date(b[propertyNames[index]]);
          return dateB - dateA;
        } else {
          return formattedB.localeCompare(formattedA);
        }
      });
    } else if (sortIcon.value[index] === 3) {
      sortIcon.value[index] = 1;
      items.value = [...initialItems.value];
    }
  };

  const itemsPerPage = ref(15);

  const currentPage = ref(1);

  const totalPages = computed(() => {
    return Math.ceil(totalItems.value.length / itemsPerPage.value);
  });

  watch(totalPages, (newValue, oldValue) => {
    if (newValue < currentPage.value || oldValue < currentPage.value) {
      currentPage.value = 1;
    }
  });

  const prev = () => {
    currentPage.value--;
  };

  const handleActivePage = (page) => {
    currentPage.value = page;
  };

  const next = () => {
    currentPage.value++;
  };

  const appendAlert = (message, type, action) => {
    nextTick(() => {
      const alertPlaceholder = document.getElementById("alertPlaceholder");

      const wrapper = document.createElement("div");

      let svgString;
      if (action === "add") {
        svgString =
          '<svg class="me-2" width="20px" height="20px" style="min-width:20px;min-height:20px;" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#0a3622" stroke="" transform="translate(0,1)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51296 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.153707,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51296 331.153707,3.55271368e-14 213.333333,3.55271368e-14 Z M293.669333,137.114453 L323.835947,167.281067 L192,299.66912 L112.916693,220.585813 L143.083307,190.4192 L192,239.335893 L293.669333,137.114453 Z" id="Shape"></path></g></svg>';
      } else if (action === "edit") {
        svgString =
          '<svg class="me-2" fill="#052c65" width="20px" height="20px" style="min-width:20px;min-height:20px;" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>info</title> <path d="M11.188 4.781c6.188 0 11.219 5.031 11.219 11.219s-5.031 11.188-11.219 11.188-11.188-5-11.188-11.188 5-11.219 11.188-11.219zM11.063 8.906c-0.313 0.375-0.469 0.813-0.469 1.281 0 0.375 0.125 0.688 0.313 0.906 0.219 0.219 0.531 0.344 0.844 0.344 0.438 0 0.844-0.188 1.156-0.563 0.281-0.344 0.438-0.844 0.438-1.375 0-0.313-0.094-0.594-0.313-0.813s-0.531-0.344-0.844-0.344c-0.406 0-0.813 0.188-1.125 0.563zM8.219 15.375l0.375 0.406c0.281-0.313 0.563-0.563 0.75-0.719 0.188-0.125 0.344-0.188 0.469-0.188 0.094 0 0.188 0.031 0.25 0.094 0.031 0.094 0.063 0.188 0.063 0.344 0 0.781-0.094 1.281-0.5 3.156s-0.625 3.25-0.625 4.156c0 0.344 0.063 0.594 0.188 0.75 0.094 0.156 0.281 0.281 0.531 0.281 0.406 0 1-0.313 1.688-0.844 0.688-0.563 1.375-1.344 2.125-2.344l-0.406-0.344c-0.25 0.313-0.5 0.531-0.688 0.688-0.188 0.125-0.344 0.25-0.469 0.25-0.094 0-0.188-0.094-0.25-0.156-0.031-0.094-0.063-0.219-0.063-0.406 0-0.125 0.031-0.531 0.156-1.25 0.094-0.719 0.063-0.719 0.25-1.781 0.031-0.313 0.125-0.75 0.219-1.281 0.25-1.594 0.406-2.563 0.406-2.875 0-0.281-0.094-0.531-0.188-0.688-0.125-0.156-0.313-0.219-0.531-0.219-0.375 0-0.875 0.281-1.563 0.781-0.688 0.531-1.375 1.25-2.188 2.188z"></path> </g></svg>';
      } else {
        svgString =
          '<svg class="me-2" width="20px" height="20px" style="min-width:20px;min-height:20px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="translate(0,-1)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#58151c"></path> </g></svg>';
      }
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        svgString,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);

      const closeButton = wrapper.querySelector(".btn-close");

      closeButton.addEventListener("click", () => {
        if (localStorage.getItem("action") && localStorage.getItem("item")) {
          localStorage.removeItem("action");
          localStorage.removeItem("item");
        } else if (localStorage.getItem("count")) {
          localStorage.removeItem("count");
        } else return;
      });
    });
  };

  onMounted(async () => {
    await fetchFunction();
    isLoading.value = false;
    if (localStorage.getItem("action")) {
      if (localStorage.getItem("action") === "add") {
        appendAlert(
          `${
            route.name === "Dogs"
              ? "Pas"
              : route.name === "Cats"
              ? "Mačka"
              : "Članak"
          } - "${localStorage.getItem("item")}" je uspješno dodan${
            route.name === "Dogs" || route.name === "News" ? "" : "a"
          } !`,
          "success",
          "add"
        );
      } else if (localStorage.getItem("action") === "edit") {
        appendAlert(
          `${
            route.name === "Dogs"
              ? "Pas"
              : route.name === "Cats"
              ? "Mačka"
              : "Članak"
          } - "${localStorage.getItem("item")}" je uspješno izmijenjen${
            route.name === "Dogs" || route.name === "News" ? "" : "a"
          }  !`,
          "info",
          "edit"
        );
      } else {
        appendAlert(
          `${
            route.name === "Dogs"
              ? "Pas"
              : route.name === "Cats"
              ? "Mačka"
              : "Članak"
          } - "${localStorage.getItem("item")}" je uspješno obrisan${
            route.name === "Dogs" || route.name === "News" ? "" : "a"
          } !`,
          "danger",
          "delete"
        );
      }
    }
  });

  onUnmounted(() => {
    controllers.forEach((controller) => {
      controller.abort();
    });
    if (localStorage.getItem("action") && localStorage.getItem("item")) {
      localStorage.removeItem("action");
      localStorage.removeItem("item");
    }
  });

  return {
    isLoading,
    items,
    initialItems,
    totalItems,
    searchInput,
    slicedItems,
    sortIcon,
    isVisible,
    setSortIcon,
    toggleSortIcon,
    itemsPerPage,
    currentPage,
    totalPages,
    prev,
    handleActivePage,
    next,
  };
}
