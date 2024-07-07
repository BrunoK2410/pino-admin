import { ref, onMounted, onUnmounted, computed, watch } from "vue";
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
      initialItems.value = [...items.value];
      totalItems.value = [...items.value];
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
    } else return value;
  };

  const searchInput = ref("");

  const slicedItems = computed(() => {
    let filtered = [...items.value];
    if (searchInput.value !== "") {
      filtered = items.value.filter((item) =>
        propertyNames.some((property) =>
          formatValue(item[property], property)
            .toString()
            .toLowerCase()
            .includes(searchInput.value.toLowerCase())
        )
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
    if (!dateString) return new Date(0); // Return a default date if input is empty or undefined

    const [day, month, year] = dateString.split(".").map(Number);
    return new Date(year, month - 1, day);
  }

  const toggleSortIcon = (eventData) => {
    const index = eventData.index;
    const sortSubject = eventData.header;
    console.log(sortSubject);
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

  onMounted(async () => {
    await fetchFunction();
    isLoading.value = false;
  });

  onUnmounted(() => {
    controllers.forEach((controller) => {
      controller.abort();
    });
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
