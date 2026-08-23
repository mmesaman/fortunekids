# How to manage the Sponsored Children page

This guide explains how to add, edit or remove a child on the
**Sponsor** page — without touching any HTML and without any
programming knowledge. You only need a free GitHub account with
permission to this repository, and you can do everything from your
web browser (or the GitHub mobile app).

All the children live in **one single file**:

```
js/kids-data.js
```

---

## 1. Add a new child

### Step 1 — Upload the photo

1. Go to `github.com` and open this repository.
2. Navigate to the folder `assets/images/sponsor/`.
3. Click **Add file → Upload files**.
4. Drag the child's photo into the box.
   - Use `.jpg`, ideally around 800×600 pixels.
   - Give it a **simple name with no spaces or accents**, for example:
     `maria.jpg`
5. Click **Commit changes**.

### Step 2 — Add the child to the list

1. Open the file `js/kids-data.js`.
2. Click the **pencil icon (✏️)** at the top right of the code to edit it.
3. Scroll to the list called `KIDS`. Each child is one block like this:

```js
{ foto: "maria.jpg", nombre: "Maria John", edad: 6, sexo: "F",
  hobby_en: "Playing football",       hobby_es: "Jugar al futbol",
  sueno_en: "to become a doctor",     sueno_es: "ser doctora",
  apadrinado: false },
```

4. Copy an existing block, paste it **at the end of the list**, and fill in:

| Field        | Meaning                                            | Example                |
|--------------|----------------------------------------------------|------------------------|
| `foto`       | Photo file name (must match Step 1 exactly)        | `"maria.jpg"`          |
| `nombre`     | Full name                                          | `"Maria John"`         |
| `edad`       | Age                                                | `6`                    |
| `sexo`       | `"F"` girl / `"M"` boy                             | `"F"`                  |
| `hobby_en`   | What the child loves — English                     | `"Playing football"`   |
| `hobby_es`   | What the child loves — Spanish                     | `"Jugar al futbol"`    |
| `sueno_en`   | Dream job — English                                | `"to become a doctor"` |
| `sueno_es`   | Dream job — Spanish                                | `"ser doctora"`        |
| `apadrinado` | `true` if already sponsored, `false` if not        | `false`                |

5. Click **Commit changes**.

Done! The English page (`/pages/sponsor.html`) and the Spanish page
(`/es/pages/apadrina.html`) update automatically after about one minute.

> ⚠️ **Important:** keep the quotes `" "`, commas `,` and braces `{ }`
> exactly as they are in the examples. A missing comma is the most
> common mistake — if the page ever shows no children, check that
> every block ends with `}` and has a comma after it (except the very
> last one).

---

## 2. Mark a child as sponsored

1. Open `js/kids-data.js`, click ✏️.
2. Find the child's block and change `apadrinado: false` to
   `apadrinado: true`.
3. Commit changes. The green **"Sponsored ✓"** badge appears by itself.

---

## 3. Edit a child's details

Same file: change the text inside the quotes and commit. For example,
a new age, a new dream, or a better photo (upload the photo first,
then update the `foto:` name).

---

## 4. Remove a child

Delete that child's whole block (from `{` to `},`) and commit.
The photo can stay in the repository; it simply won't be shown.

---

## 5. Featured children on "How to help"

The 3 children shown on the *How to help* page are chosen
automatically: any block containing `destacado: true` appears there
(maximum 3). To swap one, just move the `destacado: true` flag to a
different child.

---

## Quick checklist

- [ ] Photo uploaded to `assets/images/sponsor/` (name without spaces)
- [ ] Block added/edited in `js/kids-data.js`
- [ ] Commas and quotes intact
- [ ] Committed — wait ~1 minute and refresh the website
