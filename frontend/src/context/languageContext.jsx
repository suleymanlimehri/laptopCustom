import React, { createContext, useState, useContext } from 'react';

export const languageData = {
  en: {
    home: 'Home',
    catalog: 'Catalog',
    cart: 'Cart',
    checkout: 'Checkout',
    logout: 'Logout',
    language: 'Language',
    hello: 'Hello',
    orderhistory: 'Order History',
    faq: 'FAQ',
    contact: 'Contact',
    aboutus: 'About Us',
    more: "more",
    logo: "My store",
    OpenAIChatbot: " OpenAI Chatbot",
    catalogPage: {
      title: "Explore Our Laptops",
      searchPlaceholder: "Search laptops...",
      allBrands: "All Brands",
      maxPrice: "Max Price",
      sort: "Sort",
      priceLowHigh: "Price Low → High",
      priceHighLow: "Price High → Low",
      noResults: "No products found.",
      loading: "Loading..."
    },
    checkoutPage: {
      checkout: "Checkout",
      emptyCartMessage: "Your cart is empty.",
      shippingAddress: "Shipping Address",
      basePrice: "Base Price",
      selectedOptions: "Selected Options",
      quantity: "Quantity",
      totalForItem: "Total for Item",
      total: "Total",
      card: "Card",
      cash: "Cash",
      standard: "Standard (Free)",
      express: "Express (+$20)",
      promoCode: "Enter promo code",
      apply: "Apply",
      promoApplied: "✅ Promo code applied! $10 discount.",
      promoInvalid: "❌ Invalid promo code",
      discountInfo: "Promo Discount",
      invalidAddress: "❗ Address must be at least 10 characters long.",
      processing: "Processing...",
      completePayment: "Complete Payment",
      areYouSure: "Are you sure?",
      confirmOrder: "✅ Confirm",
      cancelOrder: "❌ Cancel",
      enterCardDetails: "Enter Card Details",
      cardNumber: "Card Number",
      expiryDate: "Expiry Date",
      cvv: "CVV",
      pay: "✅ Pay",
      failedOrder: "❌ Failed to place the order. Please try again."
    },
    productDetails: {
      home: 'Home',
      catalog: 'Catalog',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      price: 'Price',
      reviews: 'reviews',
      brand: 'Brand',
      processor: 'Processor',
      ram: 'RAM',
      storage: 'Storage',
      display: 'Display',
      gpu: 'GPU',
      configure: 'Configure This Laptop',
      share: 'Share',
      copied: 'Link copied!',
      youMayAlsoLike: 'You May Also Like',
      loading: 'Loading...',
      notFound: 'Product not found.',
      integre: "Integrated"
    },
    productConfigure: {
      loading: 'Loading...',
      basePrice: 'Base Price',
      configureTitle: 'Configure Your Laptop',
      totalPrice: 'Total Price',
      addToCart: 'Add to Cart'
    },
    cartPage: {
      yourCart: "🛒 Your Cart",
      emptyMessage: "Your cart is empty. Start shopping and configuring!",
      explore: "Explore Products",
      clearCart: "🗑️ Clear Cart",
      basePrice: "Base Price",
      selectedOptions: "Selected Options",
      individualPrices: "Individual Prices",
      totalForItem: "Total for Item",
      total: "Total",
      proceed: "Proceed to Checkout",
      remove: "Remove"
    },
    ordersPage: {
      title: "My Orders",
      loading: "Loading...",
      error: "🚫 Failed to load orders.",
      empty: "You haven't placed any orders yet.",
      address: "Address",
      amount: "Amount",
      products: "Products",
      unknownProduct: "Unknown Product",
      cancelledStatus: "Cancelled",
      pendingStatus: "Pending",
      paidStatus: "Paid"
    },
    successPage: {
      title: "✅ Payment Successful!",
      message: "Your order has been placed. Thank you for shopping!",
      orderNumber: "Order Number",
      confirmation: "We’ve sent your confirmation email.",
      backToCatalog: "🏠 Back to Catalog",
      viewOrders: "📦 View My Orders",
      redirecting: "Redirecting to Catalog in",
      seconds: "seconds..."
    },
    cancelPage: {
      title: "❌ Payment Cancelled",
      message: "Your payment was cancelled. No worries – you can try again!",
      quotes: [
        "“Failure is simply the opportunity to begin again.”",
        "“Don’t worry! Even the best fail sometimes.”",
        "“Retry and success is yours!”",
        "“Every setback is a setup for a comeback.”"
      ],
      retry: "🔁 Retry Payment",
      backToCatalog: "🏠 Back to Catalog"
    },
    aboutPage: {
      heroTitle: "Welcome to My Store",
      heroSubtitle: "Design Your Perfect Machine. Your Laptop, Your Rules.",
      promiseTitle: "Our Promise",
      promiseText: "We believe technology should adapt to you, not the other way around. My Store's Laptop Configurator is built for those who demand the extraordinary.",
      howItWorksTitle: "How Configuration Works",
      steps: [
        { title: "Pick Your Base", desc: "Start with trusted models from top brands." },
        { title: "Customize Features", desc: "Select RAM, storage, GPU, color, keyboard lighting and more." },
        { title: "Preview & Order", desc: "Get transparent pricing and seamless checkout." }
      ],
      ctaTitle: "Begin Your Journey",
      ctaButton: "Configure Now"
    },
    faqPage: {
      title: "❓ Frequently Asked Questions",
      items: [
        {
          question: "How do I customize my laptop?",
          answer: "Choose your model, pick extra options (RAM, Storage, Color, etc), and see live pricing updates. Then add to cart!"
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards, PayPal, Apple Pay, and even Cash on Delivery in select regions."
        },
        {
          question: "How long does shipping take?",
          answer: "Standard shipping is 5–7 business days. Express options are available for faster delivery."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you'll receive a tracking link by email."
        },
        {
          question: "How can I contact support?",
          answer: "You can reach us via the Contact page or email us at support@customlaptops.com."
        }
      ]
    },
    contactPage: {
      title: "💬 Contact & Support",
      subtitle: "We're online 24/7. Leave us a message and our agent will respond soon!",
      agentStatus: "🟢 Support Agent Status: Online",
      placeholders: {
        name: "Your Name *",
        email: "Your Email *",
        message: "Your Message (max 300 chars) *"
      },
      subjectLabel: "Subject",
      subjects: [
        "General Inquiry",
        "Billing Issue",
        "Technical Support",
        "Feedback / Suggestion"
      ],
      priorityLabel: "Priority:",
      priorities: ["Low", "Medium", "High"],
      sending: "Sending...",
      sendButton: "Send Message",
      requiredError: "❌ Please fill in all required fields.",
      successMessage: "✅ Your message has been sent! We will reply shortly."
    },
    footer: {
      brandTitle: 'Laptop Configurator Pro',
      brandSlogan: 'Build your dream machine with us.',
      quickLinks: 'Quick Links',
      links: {
        catalog: 'Catalog',
        about: 'About Us',
        faq: 'FAQ',
        contact: 'Contact'
      },
      connect: 'Connect with us',
      copyright: 'Laptop Configurator Pro. All Rights Reserved.'
    },
    wishlistPage: {
      title: "My Wishlist ❤️",
      empty: "No items in your wishlist yet.",
      offerError: "Failed to send offer. Please try again!",
      headers: {
        product: "Product",
        price: "Price",
        stock: "Stock Status",
        action: "Action",
        remove: "Remove"
      },
      makeOffer: "Make an Offer",
      offerFor: "Make an Offer for",
      sendOffer: "Send Offer",
      cancel: "Cancel",
      enterYourPrice: "Enter your offer price below:",
      pricePlaceholder: "Your offer price",
      offerSent: "Your offer was sent",
      enterValidOffer: "Please enter a valid offer!",
      inStock: "✔ In Stock",
      outOfStock: "✖ Out of Stock",
      addToCart: "Add to Cart",
      contactUs: "Contact Us"
    },
    adminPage: {
      loading: "Loading...",
      ordersTitle: "Orders",
      noOrders: "No orders yet.",
      usersTitle: "Users",
      noUsers: "No users found.",
      productsTitle: "Products",
      noProducts: "No products yet.",
      orderCount: "Order Count",
      email: "Email",
      user: "User",
      role: "Role",
      qty: "Qty",
      total: "Total",
      noProductName: "No Product Name",
      language: "Language",
      buttons: {
        viewUsers: "View Users",
        viewProducts: "View Products",
        viewOrders: "View Orders",
        newProduct: "New Product",
        cancelAll: "Cancel All Orders",
        changeRole: "Change Role",
        newCategory: "New Category",
        save: "Save",
        cancel: "Cancel",
        create: "Create",
        deleteCategory: "Delete",
        saveChanges: "Save Changes",
        viewLogs: "View Logs"
      },
      startConfiguration: "Start Configuration",
      addToCompare: "Add to Compare",
      logsTitle: "System Logs",
      noLogs: "No logs found",
      modals: {
        changeRoleTitle: "Change Role for",
        editProduct: "Edit Product",
        newProduct: "New Product",
        newCategory: "Create New Category"
      },
      placeholders: {
        search: "Search...",
        sort: "Sort",
        name: "Name",
        description: "Description",
        price: "Price",
        imageUrl: "Image URL",
        selectCategory: "Select Category",
        allCategories: "All Categories",
        categoryName: "Category Name"
      },
      sort: {
        az: "Name A-Z",
        za: "Name Z-A",
        priceAsc: "Price Low-High",
        priceDesc: "Price High-Low"
      }
    }
  },
  az: {
    home: 'Ev',
    catalog: 'Kataloq',
    cart: 'Səbət',
    checkout: 'Ödəmə',
    logout: 'Çıxış',
    language: 'Dil',
    hello: 'Salam',
    orderhistory: 'Sifariş Tarixi',
    faq: 'Tez-tez Verilən Suallar',
    contact: 'Əlaqə',
    aboutus: 'Haqqımızda',
    more: "daha çox",
    logo: "Mənim mağazam",
    OpenAIChatbot: "OpenAI Chatbot",
    catalogPage: {
      title: "Noutbuklarımızı kəşf edin",
      searchPlaceholder: "Noutbuk axtarın...",
      allBrands: "Bütün Brendlər",
      maxPrice: "Maksimal Qiymət",
      sort: "Sırala",
      priceLowHigh: "Qiymət: Aşağı → Yüksək",
      priceHighLow: "Qiymət: Yüksək → Aşağı",
      noResults: "Məhsul tapılmadı.",
      loading: "Yüklənir..."
    },
    productDetails: {
      home: 'Ev',
      catalog: 'Kataloq',
      inStock: 'Stokda var',
      outOfStock: 'Stokda yoxdur',
      price: 'Qiymət',
      reviews: 'rəylər',
      brand: 'Brend',
      processor: 'Prosessor',
      ram: 'RAM',
      storage: 'Yaddaş',
      display: 'Ekran',
      gpu: 'Qrafika',
      configure: 'Bu Noutbuku Konfiqurasiya Et',
      share: 'Paylaş',
      copied: 'Link kopyalandı!',
      youMayAlsoLike: 'Bunlar da Sizi Maraqlandıra bilər',
      loading: 'Yüklənir...',
      notFound: 'Məhsul tapılmadı.',
      integre: "İnteqrasiya edilmiş"
    },
    checkoutPage: {
      checkout: "Ödəmə",
      emptyCartMessage: "Səbətiniz boşdur.",
      shippingAddress: "Çatdırılma ünvanı",
      basePrice: "Əsas Qiymət",
      selectedOptions: "Seçilmiş Seçimlər",
      quantity: "Miqdar",
      totalForItem: "Məhsul Ümumi Qiymət",
      total: "Ümumi",
      card: "Kart",
      cash: "Nağd",
      standard: "Standart (Pulsuz)",
      express: "Ekspres (+20$)",
      promoCode: "Promo kodu daxil edin",
      apply: "Təsdiqlə",
      promoApplied: "✅ Promo kod tətbiq olundu! $10 endirim.",
      promoInvalid: "❌ Yanlış promo kod",
      discountInfo: "Promo Endirimi",
      invalidAddress: "❗ Ünvan minimum 10 simvol olmalıdır.",
      processing: "İşlənir...",
      completePayment: "Ödənişi Tamamla",
      areYouSure: "Əminsiniz?",
      confirmOrder: "✅ Təsdiqlə",
      cancelOrder: "❌ Ləğv et",
      enterCardDetails: "Kart Məlumatları",
      cardNumber: "Kart Nömrəsi",
      expiryDate: "Bitmə Tarixi",
      cvv: "CVV",
      pay: "✅ Ödə",
      failedOrder: "❌ Sifarişi tamamlamaq mümkün olmadı. Zəhmət olmasa yenidən yoxlayın."
    },
    productConfigure: {
      loading: 'Yüklənir...',
      basePrice: 'Əsas Qiymət',
      configureTitle: 'Noutbukunuzu Konfiqurasiya Edin',
      totalPrice: 'Ümumi Qiymət',
      addToCart: 'Səbətə əlavə et'
    },
    cartPage: {
      yourCart: "🛒 Səbətiniz",
      emptyMessage: "Səbətiniz boşdur. Məhsul seçib konfiqurasiya edin!",
      explore: "Məhsullara Bax",
      clearCart: "🗑️ Səbəti Təmizlə",
      basePrice: "Əsas Qiymət",
      selectedOptions: "Seçilmiş Seçimlər",
      individualPrices: "Fərdi Qiymətlər",
      totalForItem: "Məhsulun Cəmi",
      total: "Cəmi",
      proceed: "Ödəməyə Keç",
      remove: "Sil"
    },
    ordersPage: {
      title: "Mənim Sifarişlərim",
      loading: "Yüklənir...",
      error: "🚫 Sifarişləri yükləmək alınmadı.",
      empty: "Hələ heç bir sifariş etməmisiniz.",
      address: "Ünvan",
      amount: "Məbləğ",
      products: "Məhsullar",
      unknownProduct: "Bilinməyən Məhsul",
      cancelledStatus: "Ləğv Edildi",
      pendingStatus: "Gözləmədə",
      paidStatus: "Ödənildi"
    },

    successPage: {
      title: "✅ Ödəniş Uğurludur!",
      message: "Sifarişiniz qəbul edildi. Alış-veriş etdiyiniz üçün təşəkkürlər!",
      orderNumber: "Sifariş Nömrəsi",
      confirmation: "Təsdiq e-poçtunuz göndərildi.",
      backToCatalog: "🏠 Kataloqa Qayıt",
      viewOrders: "📦 Sifarişlərim",
      redirecting: "Kataloqa yönləndirilir",
      seconds: "saniyə..."
    },
    cancelPage: {
      title: "❌ Ödəniş Ləğv Olundu",
      message: "Ödənişiniz ləğv olundu. Narahat olmayın – yenidən cəhd edə bilərsiniz!",
      quotes: [
        "“Uğursuzluq sadəcə yenidən başlama fürsətidir.”",
        "“Narahat olmayın! Ən yaxşılar da bəzən uduzur.”",
        "“Yenidən cəhd et və uğur sənin olacaq!”",
        "“Hər geriləmə bir dönüş üçün fürsətdir.”"
      ],
      retry: "🔁 Yenidən Cəhd Et",
      backToCatalog: "🏠 Kataloqa Qayıt"
    },
    aboutPage: {
      heroTitle: "My Store-a Xoş Gəlmisiniz",
      heroSubtitle: "Öz ideal noutbukunuzu dizayn edin. Seçim sizin əlinizdədir.",
      promiseTitle: "Bizim Vədimiz",
      promiseText: "Texnologiyanın sizə uyğunlaşmalı olduğuna inanırıq. My Store-un Laptop Konfiquratoru qeyri-adi təcrübə axtaranlar üçün qurulub.",
      howItWorksTitle: "Konfiqurasiya Necə İşləyir",
      steps: [
        { title: "Əsas Modeli Seçin", desc: "Ən yaxşı brendlərin etibarlı modellərindən başlayın." },
        { title: "Xüsusiyyətləri Fərdiləşdirin", desc: "RAM, yaddaş, GPU, rəng, klaviatura işığı və daha çoxunu seçin." },
        { title: "Önizləyin və Sifariş Edin", desc: "Tam şəffaf qiymətlərlə rahat sifariş verin." }
      ],
      ctaTitle: "Səyahətə Başlayın",
      ctaButton: "İndi Konfiqurasiya Et"
    },
    footer: {
      brandTitle: 'Laptop Konfiquratoru Pro',
      brandSlogan: 'Xəyalınızdakı noutbuku bizimlə qurun.',
      quickLinks: 'Sürətli keçidlər',
      links: {
        catalog: 'Kataloq',
        cart: 'Səbət',
        faq: 'Tez-tez verilən suallar',
        contact: 'Əlaqə'
      },
      connect: 'Bizimlə əlaqə',
      copyright: 'Laptop Konfiquratoru Pro. Bütün hüquqlar qorunur.'
    },
    faqPage: {
      title: "❓ Tez-Tez Verilən Suallar",
      items: [
        {
          question: "Noutbuku necə fərdiləşdirə bilərəm?",
          answer: "Modelinizi seçin, əlavə variantları (RAM, Yaddaş, Rəng və s.) seçin və canlı qiymət yeniləmələrini izləyin. Sonra səbətə əlavə edin!"
        },
        {
          question: "Hansı ödəniş metodları mövcuddur?",
          answer: "Kredit/debet kartları, PayPal, Apple Pay və bəzi bölgələrdə Nağd Ödəniş qəbul edirik."
        },
        {
          question: "Çatdırılma nə qədər çəkir?",
          answer: "Standart çatdırılma 5–7 iş günü çəkir. Sürətli çatdırılma variantları mövcuddur."
        },
        {
          question: "Sifarişi necə izləyə bilərəm?",
          answer: "Bəli! Sifarişiniz göndərildikdə sizə e-poçt vasitəsilə izləmə linki göndəriləcək."
        },
        {
          question: "Dəstək xidməti ilə necə əlaqə saxlaya bilərəm?",
          answer: "Əlaqə səhifəmizdən və ya support@customlaptops.com ünvanına yazaraq bizimlə əlaqə saxlaya bilərsiniz."
        }
      ]
    },
    wishlistPage: {
      title: "Arzu Siyahım ❤️",
      offerError: "Təklif göndərilə bilmədi. Yenidən cəhd edin!",
      empty: "Arzu siyahınızda hələ məhsul yoxdur.",
      headers: {
        product: "Məhsul",
        price: "Qiymət",
        stock: "Anbar Statusu",
        action: "Əməliyyat",
        remove: "Sil"
      },
      makeOffer: "Təklif göndər",
      offerFor: "Təklif göndər:",
      sendOffer: "Göndər",
      cancel: "Ləğv et",
      enterYourPrice: "Təklif etdiyiniz qiyməti daxil edin:",
      pricePlaceholder: "Təklif qiyməti",
      offerSent: "Təklifiniz göndərildi",
      enterValidOffer: "Zəhmət olmasa düzgün təklif daxil edin!",
      inStock: "✔ Anbarda var",
      outOfStock: "✖ Anbarda yoxdur",
      addToCart: "Səbətə əlavə et",
      contactUs: "Bizimlə əlaqə"
    },
    contactPage: {
      title: "💬 Əlaqə və Dəstək",
      subtitle: "7/24 onlaynıq. Bizə mesaj göndərin, tezliklə cavab verəcəyik!",
      agentStatus: "🟢 Dəstək Agentinin Statusu: Onlayn",
      placeholders: {
        name: "Adınız *",
        email: "Email *",
        message: "Mesajınız (maksimum 300 simvol) *"
      },
      subjectLabel: "Mövzu",
      subjects: [
        "Ümumi Sorğu",
        "Ödəniş Problemi",
        "Texniki Dəstək",
        "Rəy / Təklif"
      ],
      priorityLabel: "Əhəmiyyət:",
      priorities: ["Aşağı", "Orta", "Yüksək"],
      sending: "Göndərilir...",
      sendButton: "Mesaj Göndər",
      requiredError: "❌ Zəhmət olmasa bütün vacib sahələri doldurun.",
      successMessage: "✅ Mesajınız göndərildi! Tezliklə cavab verəcəyik."
    },
    adminPage: {
      loading: "Yüklənir...",
      ordersTitle: "Sifarişlər",
      noOrders: "Hələ sifariş yoxdur.",
      usersTitle: "İstifadəçilər",
      noUsers: "İstifadəçi tapılmadı.",
      productsTitle: "Məhsullar",
      noProducts: "Hələ məhsul yoxdur.",
      orderCount: "Sifariş sayı",
      email: "Email",
      user: "İstifadəçi",
      role: "Rol",
      qty: "Say",
      total: "Cəmi",
      noProductName: "Məhsul adı yoxdur",
      language: "Dil",
      buttons: {
        viewUsers: "İstifadəçilərə Bax",
        newCategory: "Yeni kateqoriya",
        viewProducts: "Məhsullara Bax",
        viewOrders: "Sifarişlərə Bax",
        newProduct: "Yeni Məhsul",
        cancelAll: "Bütün Sifarişləri Ləğv Et",
        changeRole: "Rol Dəyiş",
        save: "Yadda Saxla",
        cancel: "Ləğv Et",
        create: "Yarat",
        saveChanges: "Dəyişiklikləri Saxla",
        deleteCategory: "Sil",
        viewLogs: "Günlüklərə Baxın"
      },
      logsTitle: "Sistem Qeydləri",
      noLogs: "Heç bir qeyd tapılmadı",
      modals: {
        changeRoleTitle: "Rol Dəyişdir: ",
        editProduct: "Məhsulu Redaktə Et",
        newProduct: "Yeni Məhsul",
        newCategory: "Yeni kateqoriya yarat"
      },
      placeholders: {
        search: "Axtar...",
        sort: "Sıralama",
        name: "Ad",
        description: "Təsvir",
        price: "Qiymət",
        imageUrl: "Şəkil URL",
        selectCategory: "Kateqoriyanı seç",
        allCategories: "Bütün kateqoriyalar",
        categoryName: "Kateqoriya adı"
      },
      sort: {
        az: "Ad A-Z",
        za: "Ad Z-A",
        priceAsc: "Qiymət Aşağı-Yuxarı",
        priceDesc: "Qiymət Yuxarı-Aşağı"
      }
    }
  },
  ru: {
    home: 'Дом',
    catalog: 'Каталог',
    cart: 'Корзина',
    checkout: 'Оформление',
    logout: 'Выйти',
    language: 'Язык',
    hello: 'Привет',
    orderhistory: 'История заказов',
    faq: 'Часто задаваемые вопросы',
    contact: 'Контакты',
    aboutus: 'О нас',
    more: "более",
    logo: "мой магазин",
    OpenAIChatbot: "Чат-бот OpenAI",
    catalogPage: {
      title: "Изучайте наши ноутбуки",
      searchPlaceholder: "Поиск ноутбуков...",
      allBrands: "Все бренды",
      maxPrice: "Максимальная цена",
      sort: "Сортировка",
      priceLowHigh: "Цена: низкая → высокая",
      priceHighLow: "Цена: высокая → низкая",
      noResults: "Продукты не найдены.",
      loading: "Загрузка..."
    },
    checkoutPage: {
      checkout: "Оплата",
      emptyCartMessage: "Ваша корзина пуста.",
      shippingAddress: "Адрес доставки",
      basePrice: "Базовая цена",
      selectedOptions: "Выбранные опции",
      quantity: "Количество",
      totalForItem: "Итого за товар",
      total: "Итого",
      card: "Карта",
      cash: "Наличные",
      standard: "Стандарт (Бесплатно)",
      express: "Экспресс (+20$)",
      promoCode: "Введите промокод",
      apply: "Применить",
      promoApplied: "✅ Промокод применен! Скидка $10.",
      promoInvalid: "❌ Неверный промокод",
      discountInfo: "Скидка по промокоду",
      invalidAddress: "❗ Адрес должен быть не короче 10 символов.",
      processing: "Обработка...",
      completePayment: "Завершить оплату",
      areYouSure: "Вы уверены?",
      confirmOrder: "✅ Подтвердить",
      cancelOrder: "❌ Отмена",
      enterCardDetails: "Данные карты",
      cardNumber: "Номер карты",
      expiryDate: "Срок действия",
      cvv: "CVV",
      pay: "✅ Оплатить",
      failedOrder: "❌ Не удалось оформить заказ. Попробуйте еще раз."
    },
    footer: {
      brandTitle: 'Конфигуратор Ноутбуков Pro',
      brandSlogan: 'Создай свой идеальный ноутбук с нами.',
      quickLinks: 'Быстрые ссылки',
      links: {
        catalog: 'Каталог',
        cart: 'Корзина',
        faq: 'Вопросы и ответы',
        contact: 'Контакты'
      },
      connect: 'Связаться с нами',
      copyright: 'Конфигуратор Ноутбуков Pro. Все права защищены.'
    },
    productDetails: {
      home: 'Главная',
      catalog: 'Каталог',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии',
      price: 'Цена',
      reviews: 'отзывов',
      brand: 'Бренд',
      processor: 'Процессор',
      ram: 'ОЗУ',
      storage: 'Хранилище',
      display: 'Экран',
      gpu: 'Графика',
      configure: 'Настроить этот ноутбук',
      share: 'Поделиться',
      copied: 'Ссылка скопирована!',
      youMayAlsoLike: 'Вам также может понравиться',
      loading: 'Загрузка...',
      notFound: 'Товар не найден.',
      integre: "Интегрированный"
    },
    wishlistPage: {
      title: "Мой список желаний ❤️",
      offerError: "Не удалось отправить предложение. Попробуйте снова!",
      empty: "В вашем списке желаний пока нет товаров.",
      headers: {
        product: "Товар",
        price: "Цена",
        stock: "Наличие",
        action: "Действие",
        remove: "Удалить"
      },
      makeOffer: "Сделать предложение",
      offerFor: "Сделать предложение для",
      sendOffer: "Отправить",
      cancel: "Отмена",
      enterYourPrice: "Введите вашу цену ниже:",
      pricePlaceholder: "Ваша цена",
      offerSent: "Ваше предложение отправлено",
      enterValidOffer: "Пожалуйста, введите корректную цену!",
      inStock: "✔ В наличии",
      outOfStock: "✖ Нет в наличии",
      addToCart: "Добавить в корзину",
      contactUs: "Связаться с нами"
    },
    productConfigure: {
      loading: 'Загрузка...',
      basePrice: 'Базовая цена',
      configureTitle: 'Настройте свой ноутбук',
      totalPrice: 'Итоговая цена',
      addToCart: 'Добавить в корзину'
    },
    cartPage: {
      yourCart: "🛒 Ваша корзина",
      emptyMessage: "Ваша корзина пуста. Начните выбирать и настраивать товары!",
      explore: "Просмотреть товары",
      clearCart: "🗑️ Очистить корзину",
      basePrice: "Базовая цена",
      selectedOptions: "Выбранные опции",
      individualPrices: "Отдельные цены",
      totalForItem: "Итого за товар",
      total: "Итого",
      proceed: "Перейти к оплате",
      remove: "Удалить"
    },
    ordersPage: {
      title: "Мои заказы",
      loading: "Загрузка...",
      error: "🚫 Не удалось загрузить заказы.",
      empty: "Вы еще не сделали ни одного заказа.",
      address: "Адрес",
      amount: "Сумма",
      products: "Товары",
      unknownProduct: "Неизвестный товар",
      cancelledStatus: "Отменено",
      pendingStatus: "В ожидании",
      paidStatus: "Оплачено"
    }
    ,
    successPage: {
      title: "✅ Оплата успешна!",
      message: "Ваш заказ был размещен. Спасибо за покупку!",
      orderNumber: "Номер заказа",
      confirmation: "Мы отправили вам подтверждение на почту.",
      backToCatalog: "🏠 Назад в каталог",
      viewOrders: "📦 Мои заказы",
      redirecting: "Перенаправление в каталог через",
      seconds: "секунд..."
    },
    aboutPage: {
      heroTitle: "Добро пожаловать в My Store",
      heroSubtitle: "Создайте свой идеальный ноутбук. Ваши правила.",
      promiseTitle: "Наше Обещание",
      promiseText: "Мы считаем, что технологии должны подстраиваться под вас. Конфигуратор ноутбуков My Store создан для тех, кто требует исключительного.",
      howItWorksTitle: "Как Работает Конфигуратор",
      steps: [
        { title: "Выберите Базу", desc: "Начните с проверенных моделей ведущих брендов." },
        { title: "Настройте Характеристики", desc: "Выберите ОЗУ, хранилище, GPU, цвет, подсветку клавиатуры и многое другое." },
        { title: "Просмотр и Заказ", desc: "Прозрачные цены и удобное оформление заказа." }
      ],
      ctaTitle: "Начните Путешествие",
      ctaButton: "Настроить Сейчас"
    },
    faqPage: {
      title: "❓ Часто задаваемые вопросы",
      items: [
        {
          question: "Как настроить мой ноутбук?",
          answer: "Выберите модель, добавьте опции (RAM, Память, Цвет и т.д.) и следите за обновлением цены в реальном времени. Затем добавьте в корзину!"
        },
        {
          question: "Какие способы оплаты вы принимаете?",
          answer: "Мы принимаем кредитные/дебетовые карты, PayPal, Apple Pay и даже оплату при получении в некоторых регионах."
        },
        {
          question: "Сколько времени занимает доставка?",
          answer: "Стандартная доставка — 5–7 рабочих дней. Доступны варианты экспресс-доставки."
        },
        {
          question: "Могу ли я отследить заказ?",
          answer: "Да! После отправки заказа вы получите ссылку для отслеживания по электронной почте."
        },
        {
          question: "Как связаться с поддержкой?",
          answer: "Вы можете написать нам через страницу Контакты или по адресу support@customlaptops.com."
        }
      ]
    },
    contactPage: {
      title: "💬 Контакт и Поддержка",
      subtitle: "Мы онлайн 24/7. Оставьте сообщение, и наш агент скоро ответит!",
      agentStatus: "🟢 Статус агента поддержки: Онлайн",
      placeholders: {
        name: "Ваше имя *",
        email: "Ваш Email *",
        message: "Ваше сообщение (макс 300 символов) *"
      },
      subjectLabel: "Тема",
      subjects: [
        "Общий вопрос",
        "Проблема с оплатой",
        "Техническая поддержка",
        "Отзыв / Предложение"
      ],
      priorityLabel: "Приоритет:",
      priorities: ["Низкий", "Средний", "Высокий"],
      sending: "Отправка...",
      sendButton: "Отправить сообщение",
      requiredError: "❌ Пожалуйста, заполните все обязательные поля.",
      successMessage: "✅ Ваше сообщение отправлено! Мы скоро ответим."
    },
    adminPage: {
      loading: "Загрузка...",
      ordersTitle: "Заказы",
      noOrders: "Заказов пока нет.",
      usersTitle: "Пользователи",
      noUsers: "Пользователи не найдены.",
      productsTitle: "Товары",
      noProducts: "Товаров пока нет.",
      orderCount: "Количество заказов",
      email: "Email",
      user: "Пользователь",
      role: "Роль",
      qty: "Кол-во",
      total: "Итого",
      noProductName: "Нет названия товара",
      language: "Язык",
      buttons: {
        viewUsers: "Посмотреть пользователей",
        viewProducts: "Посмотреть товары",
        viewOrders: "Посмотреть заказы",
        newProduct: "Новый товар",
        cancelAll: "Отменить все заказы",
        changeRole: "Изменить роль",
        save: "Сохранить",
        cancel: "Отмена",
        create: "Создать",
        newCategory: "Новая категория",
        saveChanges: "Сохранить изменения",
        deleteCategory: "Удалить",
        viewLogs: "Просмотреть журналы"
      },
      modals: {
        changeRoleTitle: "Изменить роль для",
        editProduct: "Редактировать товар",
        newProduct: "Новый товар",
        newCategory: "Создать новую категорию"
      },
      logsTitle: "Системные журналы",
      noLogs: "Журналы не найдены",
      placeholders: {
        search: "Поиск...",
        sort: "Сортировка",
        name: "Название",
        description: "Описание",
        price: "Цена",
        imageUrl: "URL изображения",
        selectCategory: "Выберите категорию",
        allCategories: "Все категории",
        categoryName: "Название категории"
      },
      sort: {
        az: "Название A-Z",
        za: "Название Z-A",
        priceAsc: "Цена по возрастанию",
        priceDesc: "Цена по убыванию"
      }
    }
  }
};
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('appLanguage') || 'en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('appLanguage', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, languageData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);