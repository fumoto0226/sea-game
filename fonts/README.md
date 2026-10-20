# Game fonts

Self-hosted fonts under SIL Open Font License 1.1; license files are kept alongside the web fonts.

- Latin and digits: Itim — https://github.com/google/fonts/tree/main/ofl/itim
- Chinese: Xiaolai v3.126 — https://github.com/lxgw/kose-font
- Japanese (`lang="ja"` on the page or text container): Zen Maru Gothic — https://github.com/google/fonts/tree/main/ofl/zenmarugothic

The default page is `lang="zh-CN"`. Japanese pages/text should use `lang="ja"`; the CSS keeps Latin/digits in Itim in either language. Xiaolai-UI is a small subset of the current UI strings; the complete Xiaolai font provides fallback for additional characters. Regenerate the UI subset after adding text if needed for loading performance. Itim and Xiaolai provide one real regular weight; existing heavier text uses browser synthetic bold. Zen Maru Gothic has real regular/medium/bold/black web weights.

The original Xiaolai TTF and all five Zen Maru Gothic TTF weights were installed in the current user's macOS `~/Library/Fonts` for Figma. Browser visitors do not need those local installations.
