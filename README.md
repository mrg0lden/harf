# حرف (Harf.js)

English README is available below.

## ما هي؟
مكتبة بسيطة تمكّن تحريك الأحرف العربية منفردة

### Example:
في المتصفحات الحالية. ـ  `<span>`  في الأعلى شكل الأحرف العربية عندما يوضع أحدها داخل العنصر
أدناه الشكل المفترض (والذي ستحصل عليه عند استخدام هذه المكتبة). ـ


[![example-of-the-problem](https://raw.githubusercontent.com/mrg0lden/harf/master/example.jpg)](https://w3c.github.io/i18n-tests/run?base=.&batch=cursive&test=css-text/shaping/shaping-001.html)

## لم؟

تحريك الأحرف العربية منفردة مستحيل حاليًا دون استخدام بعض الحيل.

[هنا](http://tobiasahlin.com/moving-letters/) تحريك رائع يعتمد على تحريك كل حرف لوحده والذي لا يمكن تنفيذ مثله على الأحرف العربية دون حيل.
مبدع التحريك:
[@tobiasahlin](https://github.com/tobiasahlin)

## كيف؟

هذه المكتبة تستبدل الأحرف العربية  [بأشكالها](https://unicode.org/charts/nameslist/) حسب موقعها في الكلمة

## ماذا عن "الإتاحة"؟

أفضل حل حاليًا هو استخدام سمة 
(attribute) `aria-hidden`
على العناصر التي تستخدم المكتبة واستخدام كلاس 
[Bulma](//bulma.io) من `is-sr-only`
أو ما شابهة لعنصر آخر يحوي نفس النص حتى تقرأه قارئات الشاشة
## المساهمة

أكثر من مرحّب بها! ـ


## What?
A utility to improve letter animations for Arabic alphabet.

### Example:
Above is how arabic letters look in current browsers when one of them is in a `<span>`.
Below is how it should look (and how it can look using this tiny library).


[![example-of-the-problem](https://raw.githubusercontent.com/mrg0lden/harf/master/example.jpg)](https://w3c.github.io/i18n-tests/run?base=.&batch=cursive&test=css-text/shaping/shaping-001.html)

## Why?

Animating Arabic letters individually is impossible without any work-arounds.

[Here](http://tobiasahlin.com/moving-letters/) are brilliant letters animations by [@tobiasahlin](https://github.com/tobiasahlin) that cannot be applied to Arabic letters due to the shown limitation.

## How?

Basically, this library replaces the letters with thier [presentaion forms](https://unicode.org/charts/nameslist/) according to their position in the word.

## What about "Accessibility"?

The best solution for accessibility is to add `aria-hidden` to elements that use this library while having the same text in an element with `is-sr-only` class (See [Bulma](//bulma.io).)

## Contributing

PRs are more than welcome!
