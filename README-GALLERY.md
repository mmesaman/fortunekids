# How to manage the photo gallery

This guide explains how to add, edit or remove photos on the
**Gallery** page without touching any HTML and without any
programming knowledge. You only need a free GitHub account with
permission to this repository, and you can do everything from your
web browser (or the GitHub mobile app).

All the photos live in **one single file**:

```
js/gallery-data.js
```

---

## 1. Add a new photo

### Step 1 — Upload the image

1. Go to `github.com` and open this repository.
2. Navigate to the folder `assets/images/gallery/`.
3. Click **Add file → Upload files**.
4. Drag your photo into the box.
   - Use `.jpg`, ideally around 1200 pixels wide (photos taken with a
     phone are fine).
   - Give it a **simple name with no spaces or accents**, for example:
     `g08.jpg`
5. Click **Commit changes**.

### Step 2 — Add it to the list

1. Open the file `js/gallery-data.js`.
2. Click the **pencil icon (✏️)** at the top right of the code.
3. Scroll to the list called `GALERIA`. Each photo is one line like
   this:

```js
{ foto: "g08.jpg", titulo_en: "Graduation day", titulo_es: "Dia de graduacion" },
```

4. Copy an existing line, paste it **at the end of the list**, and fill in:

| Field       | Meaning                          | Example              |
|-------------|----------------------------------|----------------------|
| `foto`      | Photo file name (must match Step 1 exactly) | `"g08.jpg"` |
| `titulo_en` | Caption in English               | `"Graduation day"`   |
| `titulo_es` | Caption in Spanish               | `"Dia de graduacion"`|

5. Click **Commit changes**.

Done! The English gallery (`/pages/gallery.html`) and the Spanish one
(`/es/pages/galeria.html`) update automatically after about one minute,
including the click-to-enlarge viewer.

> ⚠️ **Important:** keep the quotes `" "` and commas `,` exactly as in
> the examples. Every line must end with a comma, except the very last
> one before the closing `]`.

---

## 2. Change a caption

Open `js/gallery-data.js`, click ✏️, edit the text inside the quotes
and commit.

---

## 3. Remove a photo

Delete that line from the list and commit. The image can stay in the
repository; it simply won't be shown anymore.

---

## 4. Replace a photo with a better version

Upload the new image using the **same file name** as the old one
(GitHub will confirm "this file already exists" — choose
**Commit changes / replace**). No list edits needed; the website shows
the new version automatically.

---

## Quick checklist

- [ ] Image uploaded to `assets/images/gallery/` (name without spaces)
- [ ] Line added/edited in `js/gallery-data.js`
- [ ] Quotes and commas intact
- [ ] Committed — wait ~1 minute and refresh the website
