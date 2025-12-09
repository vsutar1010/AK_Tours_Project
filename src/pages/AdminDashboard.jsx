import { useState, useEffect, useCallback, memo } from "react";
import SectionLoader from "../components/SectionLoader.jsx";
import { useNavigate } from "react-router-dom";

/* Utility Helpers */
const load = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

const save = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { console.error(e); }
};

const uid = (p = "id") => `${p}-${Date.now()}-${Math.floor(Math.random() * 99999)}`;

/* Stable Component: Prevent Unnecessary Re-renders */
const TabWrapper = memo(({ children }) => <div>{children}</div>);

/* Main Admin Dashboard */
export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");
  const navigate = useNavigate();

  /* Data States */
  const [gallery, setGallery] = useState([]);
  const [news, setNews] = useState([]);
  const [services, setServices] = useState([]);
  const [pendingFeedback, setPendingFeedback] = useState([]);
  const [approvedFeedback, setApprovedFeedback] = useState([]);

  /* Form States */
  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    category: "Special Offer",
    validUntil: "",
    image: null,
  });

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    features: "",
    price: "",
    duration: "",
    image: null,
  });

  /* Gallery staging (selected but not yet uploaded) */
  const [selectedImages, setSelectedImages] = useState([]); // array of File

  /* Load Data Once */
  useEffect(() => {
    const t = setTimeout(() => {
      setGallery(load("ak_gallery"));
      setNews(load("ak_news"));
      setServices(load("ak_services"));
      setPendingFeedback(load("ak_feedbacks"));
      setApprovedFeedback(load("ak_approved_feedbacks"));
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  /* Generic Input Handler — FIXED */
  const handleInput = useCallback((e, setter) => {
    const { name, value, files } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }, []);

  /* Convert File → Base64 */
  const fileToBase64 = (file) =>
    new Promise((res, rej) => {
      try {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.onerror = (err) => rej(err);
        reader.readAsDataURL(file);
      } catch (e) {
        rej(e);
      }
    });

  /* ----------------------- GALLERY (select -> preview -> submit) ----------------------- */

  // On file input change - just stage files (no auto upload)
  const onSelectImages = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;
    // append to existing selectedImages
    setSelectedImages((prev) => [...prev, ...files]);
    // reset input value to allow selecting same file again if needed
    e.target.value = "";
  };

  // Remove one staged image (by index)
  const removeStagedImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit staged images to gallery (convert to base64 and save)
  const handleGallerySubmit = async () => {
    if (!selectedImages.length) {
      alert("Please select one or more images to upload.");
      return;
    }

    const uploaded = [];
    try {
      for (const file of selectedImages) {
        const base64 = await fileToBase64(file);
        uploaded.push({
          id: uid("g"),
          name: file.name,
          dataUrl: base64,
          date: new Date().toISOString(),
        });
      }

      const updated = [...uploaded, ...gallery];
      setGallery(updated);
      save("ak_gallery", updated);
      setSelectedImages([]);
      alert("Images uploaded successfully.");
    } catch (err) {
      console.error("Error uploading images:", err);
      alert("Failed to upload images. Check console for details.");
    }
  };

  // Delete an already uploaded image from persistent gallery
  const deleteGallery = (id) => {
    if (!confirm("Delete this image from gallery?")) return;
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    save("ak_gallery", updated);
  };

  /* ----------------------- NEWS ----------------------- */
  const addNews = async (e) => {
    e.preventDefault();
    const img = newsForm.image ? await fileToBase64(newsForm.image) : null;
    const newItem = {
      id: uid("n"),
      ...newsForm,
      imageDataUrl: img,
      date: new Date().toISOString(),
    };
    const updated = [newItem, ...news];
    setNews(updated);
    save("ak_news", updated);
    setNewsForm({
      title: "",
      content: "",
      category: "Special Offer",
      validUntil: "",
      image: null,
    });
  };

  const deleteNewsItem = (id) => {
    if (!confirm("Delete this news item?")) return;
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    save("ak_news", updated);
  };

  /* ----------------------- SERVICES ----------------------- */
  const addService = async (e) => {
    e.preventDefault();
    const img = serviceForm.image ? await fileToBase64(serviceForm.image) : null;
    const newItem = {
      id: uid("s"),
      ...serviceForm,
      features: serviceForm.features ? serviceForm.features.split(",").map(f => f.trim()) : [],
      imageDataUrl: img,
      date: new Date().toISOString(),
    };
    const updated = [newItem, ...services];
    setServices(updated);
    save("ak_services", updated);
    setServiceForm({ name: "", description: "", features: "", price: "", duration: "", image: null });
  };

  const deleteServiceItem = (id) => {
    if (!confirm("Delete this service?")) return;
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    save("ak_services", updated);
  };

  /* ----------------------- FEEDBACK ----------------------- */
  const approveFeedbackItem = (id) => {
    const item = pendingFeedback.find((f) => f.id === id);
    if (!item) return;
    const updatedPending = pendingFeedback.filter((f) => f.id !== id);
    const updatedApproved = [item, ...approvedFeedback];
    setPendingFeedback(updatedPending);
    setApprovedFeedback(updatedApproved);
    save("ak_feedbacks", updatedPending);
    save("ak_approved_feedbacks", updatedApproved);
  };

  const deletePendingFeedbackItem = (id) => {
    if (!confirm("Delete pending feedback?")) return;
    const updated = pendingFeedback.filter((f) => f.id !== id);
    setPendingFeedback(updated);
    save("ak_feedbacks", updated);
  };

  /* ----------------------- TABS ----------------------- */

  const renderTab = () => {
    switch (tab) {
      case "gallery":
        return (
          <TabWrapper>
            <div className="card">
              <h3>Upload Gallery Images</h3>
              <p className="muted">Select multiple images, preview them below and click <strong>Upload Images</strong>.</p>

              <input type="file" multiple accept="image/*" onChange={onSelectImages} style={{ marginTop: 12 }} />

              {/* Preview staged images with remove (cross) */}
              {selectedImages.length > 0 && (
                <>
                  <h4 style={{ marginTop: 14 }}>Preview</h4>
                  <div className="gallery-grid" style={{ marginTop: 8 }}>
                    {selectedImages.map((file, idx) => (
                      <div key={`${file.name}-${idx}`} className="gallery-item" style={{ position: "relative" }}>
                        <img src={URL.createObjectURL(file)} alt={file.name} />
                        <button
                          type="button"
                          onClick={() => removeStagedImage(idx)}
                          aria-label="Remove image"
                          title="Remove image"
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            border: "none",
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            fontSize: 16,
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                        <div style={{ padding: 8, fontSize: 12, textAlign: "center" }}>{file.name}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <button className="btn-primary" onClick={handleGallerySubmit}>Upload Images</button>
                    <button className="btn-link" onClick={() => setSelectedImages([])} style={{ marginLeft: 10 }}>
                      Clear Selection
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="card" style={{ marginTop: 20 }}>
              <h3>Uploaded Gallery</h3>
              {gallery.length === 0 && <div className="muted" style={{ marginTop: 8 }}>No images uploaded yet.</div>}
              <div className="gallery-grid" style={{ marginTop: 12 }}>
                {gallery.map((g) => (
                  <div className="gallery-item" key={g.id} style={{ position: "relative" }}>
                    <img src={g.dataUrl} alt={g.name} />
                    <button
                      className="btn-link"
                      onClick={() => deleteGallery(g.id)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        borderRadius: "50%",
                        width: 30,
                        height: 30,
                        border: "none",
                        cursor: "pointer",
                      }}
                      title="Delete image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabWrapper>
        );

      case "news":
        return (
          <TabWrapper>
            <div className="card">
              <h3>Add News</h3>

              <form onSubmit={addNews} className="admin-form">
                <input
                  name="title"
                  placeholder="Title"
                  value={newsForm.title}
                  onChange={(e) => handleInput(e, setNewsForm)}
                />

                <select
                  name="category"
                  value={newsForm.category}
                  onChange={(e) => handleInput(e, setNewsForm)}
                >
                  <option>Special Offer</option>
                  <option>Company Update</option>
                  <option>Customer Review</option>
                </select>

                <textarea
                  name="content"
                  placeholder="Description"
                  value={newsForm.content}
                  onChange={(e) => handleInput(e, setNewsForm)}
                />

                <input
                  name="validUntil"
                  type="date"
                  value={newsForm.validUntil}
                  onChange={(e) => handleInput(e, setNewsForm)}
                />

                <input name="image" type="file" accept="image/*" onChange={(e) => handleInput(e, setNewsForm)} />

                <button className="btn-primary" type="submit">
                  Add News
                </button>
              </form>
            </div>

            <div className="card" style={{ marginTop: 20 }}>
              <h3>Manage News</h3>
              {news.map((n) => (
                <div className="list-row" key={n.id}>
                  <div className="list-body">
                    <strong>{n.title}</strong>
                    <p>{n.content}</p>
                  </div>
                  <button className="btn-link" onClick={() => deleteNewsItem(n.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </TabWrapper>
        );

      case "services":
        return (
          <TabWrapper>
            <div className="card">
              <h3>Add Service</h3>

              <form onSubmit={addService} className="admin-form">
                <input name="name" placeholder="Service Name" value={serviceForm.name}
                  onChange={(e) => handleInput(e, setServiceForm)} />

                <input name="price" placeholder="Price" value={serviceForm.price}
                  onChange={(e) => handleInput(e, setServiceForm)} />

                <input name="duration" placeholder="Duration" value={serviceForm.duration}
                  onChange={(e) => handleInput(e, setServiceForm)} />

                <textarea name="description" placeholder="Description" value={serviceForm.description}
                  onChange={(e) => handleInput(e, setServiceForm)} />

                <input name="features" placeholder="Features (comma-separated)" value={serviceForm.features}
                  onChange={(e) => handleInput(e, setServiceForm)} />

                <input name="image" type="file" accept="image/*"
                  onChange={(e) => handleInput(e, setServiceForm)} />

                <button className="btn-primary" type="submit">
                  Add Service
                </button>
              </form>
            </div>

            <div className="card" style={{ marginTop: 20 }}>
              <h3>Manage Services</h3>
              {services.map((s) => (
                <div className="list-row" key={s.id}>
                  <div className="list-body">
                    <strong>{s.name}</strong>
                    <p>{s.description}</p>
                  </div>
                  <button className="btn-link" onClick={() => deleteServiceItem(s.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </TabWrapper>
        );

      case "feedback":
        return (
          <TabWrapper>
            <div className="card">
              <h3>Pending Feedback</h3>
              {pendingFeedback.map((f) => (
                <div className="list-row" key={f.id}>
                  <div className="list-body">
                    <strong>{f.name}</strong>
                    <p>{f.message}</p>
                  </div>

                  <div>
                    <button className="btn-primary" onClick={() => approveFeedbackItem(f.id)}>
                      Approve
                    </button>
                    <button className="btn-link" onClick={() => deletePendingFeedbackItem(f.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: 20 }}>
              <h3>Approved Feedback</h3>
              {approvedFeedback.map((f) => (
                <div className="list-row" key={f.id}>
                  <div className="list-body">
                    <strong>{f.name}</strong>
                    <p>{f.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabWrapper>
        );

      default:
        return (
          <TabWrapper>
            <div className="card">
              <h2>Admin Overview</h2>
              <p>Your control center for gallery, news, services, and feedback.</p>
            </div>
          </TabWrapper>
        );
    }
  };

  return (
    <SectionLoader isLoading={loading}>
      <div className="admin-dashboard container">
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>

          <nav className="sidebar-nav">
            {["overview", "gallery", "news", "services", "feedback"].map((t) => (
              <button
                key={t}
                className={tab === t ? "sidebar-btn active" : "sidebar-btn"}
                onClick={() => setTab(t)}
              >
                {t.toUpperCase()}
              </button>
            ))}

            <button className="btn-link" onClick={() => navigate("/")}>
              Logout
            </button>
          </nav>
        </aside>

        <main className="admin-main">{renderTab()}</main>
      </div>
    </SectionLoader>
  );
}
