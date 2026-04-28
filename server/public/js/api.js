// =========================================================
// API CLIENT (MOCKED FOR FRONTEND TESTING)
// =========================================================

const API_BASE = "http://localhost:3000/api";

export const apiClient = {
  // 1. GET LIST
  async getAllBeans(type = null) {
    const params = new URLSearchParams({
      type: type,
    });

    const res = await fetch(
      `${API_BASE}/beans${type ? "?" + params.toString() : ""}`,
    );
    const response = await res.json();

    if (response.type === "success") return response.data;
    else return [];
  },

  // 2. GET DETAILS
  async getBeanById(id) {
    const res = await fetch(`${API_BASE}/beans/${id}`);
    const response = await res.json();

    if (response.type === "success") return response.data;
    else return {};
  },

  // 3. CREATE
  async createBean(beanData) {
    const res = await fetch(`${API_BASE}/beans`, {
      method: "POST",
      body: JSON.stringify(beanData),
    });
  },

  // 4. UPDATE
  async updateBean(id, beanData) {
    const res = await fetch(`${API_BASE}/beans/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beanData),
    });
  },

  // 5. DELETE
  async deleteBean(id) {
    const res = await fetch(`${API_BASE}/beans/${id}`, {
      method: "DELETE",
    });
  },

  // 6. LOCALIZATION
  async getTranslations(lang) {
    const res = await fetch(`${API_BASE}/i18n/${lang}`);
    const response = await res.json();

    if (response.type === "success") return response.data;
    else return {};
  },
};
