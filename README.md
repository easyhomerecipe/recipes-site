# مدونة الوصفات – Next.js

موقع وصفات بالإنجليزية، سريع ومهيأ للـ SEO وإعلانات AdSense.

## ما يحتويه الموقع
- صفحة رئيسية + صفحات الأقسام (Breakfast, Dinner, Desserts, Healthy, Moroccan)
- صفحة لكل وصفة فيها: زر "Jump to Recipe"، بطاقة الوصفة (المكونات، الخطوات، الأوقات، السعرات)، زر طباعة، أسئلة شائعة، وصفات مشابهة
- Schema كاملة لجوجل: Recipe + FAQPage + BreadcrumbList (تظهر الوصفة بالنجوم والصورة والوقت في نتائج البحث)
- sitemap.xml و robots.txt تلقائيًا
- أماكن جاهزة للإعلانات (تظهر فقط بعد إضافة كود AdSense)
- Google Analytics
- صفحات About و Privacy Policy (ضرورية لقبول AdSense)
- بحث داخلي

## التشغيل على جهازك
```bash
npm install
npm run dev
```
ثم افتح http://localhost:3000

## النشر على Vercel (مجاني)
1. ارفع المجلد إلى مستودع جديد على GitHub.
2. ادخل vercel.com ← Add New Project ← اختر المستودع ← Deploy.
3. في Settings ← Environment Variables أضف:
   - `NEXT_PUBLIC_SITE_URL` = https://your-domain.com
   - `NEXT_PUBLIC_GA_ID` = G-XXXXXXX (اختياري)
   - `NEXT_PUBLIC_ADSENSE_CLIENT` = ca-pub-XXXXXXXX (بعد قبول AdSense)
4. في Settings ← Domains أضف الدومين.
5. في Google Search Console أضف الموقع وأرسل: `https://your-domain.com/sitemap.xml`

## تعديل اسم الموقع والأقسام
كل الإعدادات في `lib/site.ts`.

## إضافة وصفة جديدة
أنشئ ملفًا في `content/recipes/` باسم الرابط، مثلًا `lemon-cake.md`، وانسخ هيكل أي وصفة موجودة:
- الجزء العلوي بين `---` : العنوان، الوصف، الصورة، القسم، الأوقات بالدقائق، المكونات، الخطوات، الأسئلة الشائعة.
- تحته: مقدمة المقال بصيغة Markdown (300–800 كلمة مفيدة للـ SEO).

الصور: ضعها في `public/images/` واكتب المسار `/images/name.jpg`، أو استعمل رابط صورة خارجي.
الصور الحالية مؤقتة (Placeholder) — استبدلها بصور حقيقية.

بعد كل وصفة جديدة: ارفع التعديل على GitHub وسيُنشر الموقع تلقائيًا.
