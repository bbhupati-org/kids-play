# Little Trail

A playful learning meadow for young children to practice all four operations, fill multiplication tables, guess numbers, solve mini Sudoku puzzles, read and listen to short stories, explore nature sounds, learn vegetable names from real photos, and color or draw original pictures.

## Play locally

Open `index.html` in a browser. The app has no build step. Vegetable photos and an original coloring-page illustration are bundled in the repository, and painting works offline. Star rewards and activity progress are saved in the browser on that device.

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the site when changes are pushed to `main` or when the workflow is run manually. In the repository settings, set **Pages** → **Build and deployment** → **Source** to **GitHub Actions**. The published site will be available at `https://bbhupati-org.github.io/kids-play/` after the first successful deployment.

Stories and vegetable names use the browser's speech synthesis voice when available. The vegetable photos include per-image creator, license, and source links in the app. The story library includes original, child-friendly retellings inspired by public-domain animal fables in [Aesop's Fables](https://www.gutenberg.org/ebooks/11339), the 1912 V. S. Vernon Jones translation hosted by Project Gutenberg. Sound garden effects are generated in the browser with the Web Audio API and do not require audio downloads.