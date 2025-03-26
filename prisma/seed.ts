import {
  MediaType,
  NewsType,
  PrismaClient,
  RegionType,
  ServiceType,
  TourType,
} from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const userData = [
    {
      email: 'phuonguyen@vietasiatravel.net',
      password: '$2b$10$uP4jmm5.hkLMdMb59gCvVevRrse/Tk34YJntSFkuU2fFZJur.PGeq',
    },
  ];
  const users = [];
  for (const usr of userData) {
    const newUser = await prisma.user.create({ data: usr });
    users.push(newUser);
  }

  await prisma.systemSetting.create({
    data: {
      name: 'Công Ty TNHH Du Lịch Việt Châu Á',
      address:
        'Đường D14/100 Khu dân cư Hồng Loan, Hưng Thành, Cái Răng, Cần Thơ',
      phone: '0962 54 0990',
      hotline: '0862 36 0990 - 0962 54 0990',
      fax: '02923660990',
      taxCode: '1801714329',
      email: 'phuonguyen@vietasiatravel.net',
      linkGoogleMap:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.5768387648634!2d105.77445461440321!3d9.997898797135127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a06284813e9dfd%3A0x9c0052d5f04ae6c4!2zQ8O0bmcgVHkgVE5ISCBEdSBM4buLY2ggVmnhu4d0IENow6J1IMOB!5e0!3m2!1svi!2s!4v1729572421725!5m2!1svi!2s',
      vouchers:
        'https://vietasiatravel.net/files/images/vietasia/1.png,https://vietasiatravel.net/files/images/vietasia/2.png,https://vietasiatravel.net/files/images/vietasia/3.png',
      sliders:
        'https://vietasiatravel.net/files/images/slide_new/z5434888424619_682c40eeda0e74c08a582bc2ce8f4e35.jpg,https://vietasiatravel.net/files/images/slide_new/z5434888418818_5ba684fdf88c6f2e102f70071d80c98d.jpg,https://vietasiatravel.net/files/images/slide_new/z5434888424693_c3e3458b93214cad4dfd81652aafff7f.jpg,https://vietasiatravel.net/files/images/slide_new/z5434888424785_8626403981218850220526a9153f120d.jpg',
      updatedAt: new Date(),
      updatedById: users[0].id,
    },
  });

  const categoryTourData = [
    { region: RegionType.EUROPE, name: 'Du lịch Pháp' },
    { region: RegionType.EUROPE, name: 'Du lịch Áo' },
    { region: RegionType.EUROPE, name: 'Du lịch Nga' },
    { region: RegionType.EUROPE, name: 'Du Lịch Đức' },
    { region: RegionType.EUROPE, name: 'Du lịch Hà Lan' },
    { region: RegionType.EUROPE, name: 'Du lịch Italia' },
    { region: RegionType.EUROPE, name: 'Du lịch Phần Lan' },
    { region: RegionType.EUROPE, name: 'Du lịch Scotland' },
    { region: RegionType.EUROPE, name: 'Du lịch Hy Lạp' },
    { region: RegionType.EUROPE, name: 'Du lịch Anh' },
    { region: RegionType.EUROPE, name: 'Du lịch Ba Lan' },
    { region: RegionType.EUROPE, name: 'Du lịch Bỉ' },
    { region: RegionType.EUROPE, name: 'Du lịch Czech' },
    { region: RegionType.EUROPE, name: 'Du lịch Hungary' },
    { region: RegionType.EUROPE, name: 'Du lịch Thụy Sĩ' },
    { region: RegionType.EUROPE, name: 'Du lịch Đan Mạch' },
    { region: RegionType.EUROPE, name: 'Du lịch Thổ Nhĩ Kỳ' },
    { region: RegionType.EUROPE, name: 'Du lịch Thụy Điển' },
    { region: RegionType.ASIA, name: 'Du lịch Ấn Độ' },
    { region: RegionType.ASIA, name: 'Du lịch Hồng Kong' },
    { region: RegionType.ASIA, name: 'Du lịch Brunei' },
    { region: RegionType.MIDDLE_EAST, name: 'Du Lịch Dubai' },
    { region: RegionType.ASIA, name: 'Du lịch Indonesia' },
    { region: RegionType.ASIA, name: 'Du lịch Malaysia' },
    { region: RegionType.ASIA, name: 'Du lịch Myanmar' },
    { region: RegionType.ASIA, name: 'Du lịch Nhật Bản' },
    { region: RegionType.ASIA, name: 'Du lịch Singapore' },
    { region: RegionType.ASIA, name: 'Du lịch Thái Lan' },
    { region: RegionType.ASIA, name: 'Du lịch Triều Tiên' },
    { region: RegionType.ASIA, name: 'Du lịch Hàn Quốc' },
    { region: RegionType.ASIA, name: 'Du lịch Campuchia' },
    { region: RegionType.ASIA, name: 'Du lịch Philippines' },
    { region: RegionType.MIDDLE_EAST, name: 'Du Lịch Israel' },
    { region: RegionType.ASIA, name: 'Du lịch Lào' },
    { region: RegionType.ASIA, name: 'Du Lịch Nepal' },
    { region: RegionType.ASIA, name: 'Du lịch Đài Loan' },
    { region: RegionType.ASIA, name: 'Du lịch Singapore – Malaysia' },
    { region: RegionType.ASIA, name: 'Du lịch Trung Quốc' },
    { region: RegionType.MIDDLE_EAST, name: 'Du lịch Trung Đông' },
    { region: RegionType.NORTH_AMERICA, name: 'Du lịch Mỹ' },
    { region: RegionType.NORTH_AMERICA, name: 'Du lịch Canada' },
    { region: RegionType.SOUTH_AMERICA, name: 'Du lịch Nam Mỹ' },
    { region: RegionType.SOUTH_AMERICA, name: 'Du lịch Brazil' },
    { region: RegionType.SOUTH_AMERICA, name: 'Du lịch Cuba' },
    { region: RegionType.AFRICA, name: 'Du lịch Ai Cập' },
    { region: RegionType.AFRICA, name: 'Du lịch Nam Phi' },
    { region: RegionType.OCEANIA, name: 'Du lịch Úc' },
    { region: RegionType.OCEANIA, name: 'Du lịch New Zealand' },
    { region: RegionType.OCEANIA, name: 'Du lịch Maldives' },
  ];

  const categories = [];
  for (const tour of categoryTourData) {
    const id = generateCategoryId(tour.name);
    const added = await prisma.categoryTour.create({
      data: {
        id: id,
        name: tour.name,
        searchName: normalizeString(tour.name),
        regionType: tour.region as RegionType,
        tourType: TourType.GLOBALTOUR,
      },
    });
    categories.push(added);
  }

  const vietnamTourData: {
    region: RegionType;
    name: string;
  }[] = [
    { region: RegionType.NORTH, name: 'Du lịch Đông Bắc' },
    { region: RegionType.NORTH, name: 'Du lịch Tây Bắc' },
    { region: RegionType.NORTH, name: 'Du lịch Hạ Long' },
    { region: RegionType.NORTH, name: 'Du lịch Hà Nội' },
    { region: RegionType.NORTH, name: 'Du lịch Sapa' },
    { region: RegionType.NORTH, name: 'Du lịch Bắc Ninh' },
    { region: RegionType.NORTH, name: 'Du lịch Lạng Sơn' },
    { region: RegionType.NORTH, name: 'Du lich Cao Bằng' },
    { region: RegionType.NORTH, name: 'Du lịch Điện Biên' },
    { region: RegionType.NORTH, name: 'Du lịch Nam Định' },
    { region: RegionType.NORTH, name: 'Du lịch Hải Phòng' },
    { region: RegionType.NORTH, name: 'Du lịch Bắc Cạn' },
    { region: RegionType.NORTH, name: 'Du lịch Ninh Bình' },
    { region: RegionType.CENTRAL, name: 'Du Lịch Đà Nẵng' },
    { region: RegionType.CENTRAL, name: 'Du lịch Hội An' },
    { region: RegionType.CENTRAL, name: 'Du lịch Ninh Thuận' },
    { region: RegionType.CENTRAL, name: 'Du lịch Phú Yên' },
    { region: RegionType.CENTRAL, name: 'Du lịch Quảng Bình' },
    { region: RegionType.CENTRAL, name: 'Du lịch Quảng Nam' },
    { region: RegionType.CENTRAL, name: 'Du lịch Đà Lạt' },
    { region: RegionType.CENTRAL, name: 'Du lịch Huế' },
    { region: RegionType.CENTRAL, name: 'Du lịch Nha Trang' },
    { region: RegionType.CENTRAL, name: 'Du lịch Quy Nhơn' },
    { region: RegionType.CENTRAL, name: 'Du lịch Vinh' },
    { region: RegionType.SOUTH, name: 'Du lịch Phan Thiết' },
    { region: RegionType.SOUTH, name: 'Du lịch Pleiku' },
    { region: RegionType.SOUTH, name: 'Du lịch Buôn Ma Thuột' },
    { region: RegionType.SOUTH, name: 'Du lịch Tây Nguyên' },
    { region: RegionType.SOUTH, name: 'Du lịch Phú Quốc' },
    { region: RegionType.SOUTH, name: 'Du lịch Côn Đảo' },
    { region: RegionType.SOUTH, name: 'Du lịch Cần Thơ' },
    { region: RegionType.SOUTH, name: 'Du lịch An Giang' },
    { region: RegionType.SOUTH, name: 'Du lịch Tiền Giang' },
    { region: RegionType.SOUTH, name: 'Du lịch Miền Tây' },
    { region: RegionType.SOUTH, name: 'Du lịch Vĩnh Long' },
    { region: RegionType.SOUTH, name: 'Du lịch Vũng Tàu' },
    { region: RegionType.SOUTH, name: 'Du lịch Đồng Nai' },
    { region: RegionType.SOUTH, name: 'Du lịch Nam Du' },
    { region: RegionType.OTHER, name: 'Du lịch hành hương' },
    { region: RegionType.OTHER, name: 'Tour Tết Nguyên Đán 2021' },
  ];

  try {
    for (const tour of vietnamTourData) {
      const id = generateCategoryId(tour.name);
      const added = await prisma.categoryTour.create({
        data: {
          id: id,
          name: tour.name,
          searchName: normalizeString(tour.name),
          regionType: tour.region as RegionType,
          tourType: TourType.VIETNAMTOUR,
        },
      });
      categories.push(added);
    }
  } catch (error) {
    console.log(error);
  }

  await prisma.tour.createMany({
    data: [
      {
        slug: 'tour-ky-thu-mien-nam',
        title: 'Tour Kỳ Thú Miền Nam',
        searchTitle: normalizeString('Tour Kỳ Thú Miền Nam'),
        content:
          'Khám phá vẻ đẹp của miền Nam Việt Nam với cảnh quan thiên nhiên tuyệt đẹp và di sản văn hóa phong phú...',
        price: 5000000,
        departureDate: new Date('2024-09-10'),
        departure: 'Cần Thơ',
        remaining: 9,
        duration: '7 ngày',
        priority: 1,
        categoryId: categories[categories.length - 3].id, // Thay thế bằng categoryId hợp lệ
        vehicle: 'Xe Bus',
        thumbnail: 'https://vietasiatravel.net/files/files/HS.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'hanh-trinh-thu-do',
        title: 'Hành Trình Thủ Đô',
        searchTitle: normalizeString('Hành Trình Thủ Đô'),
        content:
          'Trải nghiệm văn hóa đặc sắc của thủ đô Hà Nội, nơi giao thoa giữa nét cổ kính và hiện đại...',
        price: 4000000,
        departureDate: new Date('2024-09-10'),
        departure: 'Cần Thơ',
        remaining: 9,
        duration: '5 ngày',
        priority: 2,
        categoryId: categories[categories.length - 2].id, // Thay thế bằng categoryId hợp lệ
        vehicle: 'Xe Hơi',
        thumbnail: 'https://vietasiatravel.net/files/files/HS.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'sai-gon-thu-thach',
        title: 'Sài Gòn Thử Thách',
        searchTitle: normalizeString('Sài Gòn Thử Thách'),
        content:
          'Một chuyến đi nhanh gọn nhưng đầy kịch tính tại thành phố sôi động nhất Việt Nam...',
        price: 3000000,
        departureDate: new Date('2024-09-10'),
        departure: 'Cần Thơ',
        remaining: 9,
        duration: '3 ngày',
        priority: 3,
        categoryId: categories[categories.length - 1].id, // Thay thế bằng categoryId hợp lệ
        vehicle: 'Tàu Hỏa',
        thumbnail: 'https://vietasiatravel.net/files/files/HS.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      // Tour nước ngoài
      {
        slug: 'hanh-trinh-phap',
        title: 'Hành Trình Khám Phá Pháp',
        searchTitle: normalizeString('Hành Trình Khám Phá Pháp'),
        content:
          'Chiêm ngưỡng Paris hoa lệ, tháp Eiffel, và thưởng thức ẩm thực Pháp tuyệt hảo...',
        price: 30000000,
        departureDate: new Date('2024-10-15'),
        departure: 'Hà Nội',
        remaining: 12,
        duration: '10 ngày',
        priority: 1,
        categoryId: categories[3].id, // Thay thế bằng categoryId hợp lệ
        vehicle: 'Máy Bay',
        thumbnail: 'https://vietasiatravel.net/files/files/FR.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'hanh-trinh-nhat-ban',
        title: 'Tour Khám Phá Nhật Bản',
        searchTitle: normalizeString('Tour Khám Phá Nhật Bản'),
        content:
          'Khám phá văn hóa truyền thống và hiện đại của Nhật Bản, ghé thăm Tokyo và Kyoto...',
        price: 35000000,
        departureDate: new Date('2024-11-05'),
        departure: 'TP. Hồ Chí Minh',
        remaining: 15,
        duration: '8 ngày',
        priority: 2,
        categoryId: categories[2].id, // Thay thế bằng categoryId hợp lệ
        vehicle: 'Máy Bay',
        thumbnail: 'https://vietasiatravel.net/files/files/JP.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'hanh-trinh-au-my',
        title: 'Tour Chinh Phục Âu - Mỹ',
        searchTitle: normalizeString('Tour Chinh Phục Âu - Mỹ'),
        content:
          'Khám phá các thành phố nổi tiếng như New York, Los Angeles, London và Paris trong một hành trình đầy kỳ thú...',
        price: 50000000,
        departureDate: new Date('2024-12-01'),
        departure: 'Đà Nẵng',
        remaining: 10,
        duration: '15 ngày',
        priority: 3,
        categoryId: categories[1].id, // Thay thế bằng categoryId hợp lệ
        vehicle: 'Máy Bay',
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'can-tho-thu-thach',
        title: 'Cần Thơ Thử Thách',
        searchTitle: normalizeString('Cần Thơ Thử Thách'),
        content:
          'Một chuyến đi nhanh gọn nhưng đầy kịch tính tại thành phố sôi động nhất Việt Nam...',
        price: 3000000,
        departureDate: new Date('2024-09-10'),
        departure: 'Cần Thơ',
        remaining: 9,
        duration: '3 ngày',
        priority: 3,
        categoryId: categories[categories.length - 1].id, // Thay thế bằng categoryId hợp lệ
        vehicle: 'Tàu Hỏa',
        thumbnail: 'https://vietasiatravel.net/files/files/HS.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      // Tour nước ngoài
      {
        slug: 'hanh-trinh-ha-lan',
        title: 'Hành Trình Khám Phá Hà Lan',
        searchTitle: normalizeString('Hành Trình Khám Phá Hà Lan'),
        content:
          'Chiêm ngưỡng Paris hoa lệ, tháp Eiffel, và thưởng thức ẩm thực Pháp tuyệt hảo...',
        price: 30000000,
        departureDate: new Date('2024-10-15'),
        departure: 'Hà Nội',
        remaining: 12,
        duration: '10 ngày',
        priority: 1,
        categoryId: categories[3].id, // Thay thế bằng categoryId hợp lệ
        vehicle: 'Máy Bay',
        thumbnail: 'https://vietasiatravel.net/files/files/FR.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
    ],
  });

  // Seed data for Services
  await prisma.service.createMany({
    data: [
      // Dịch vụ đặt vé máy bay
      {
        slug: 'dat-ve-may-bay',
        title: 'Dịch Vụ Đặt Vé Máy Bay',
        searchTitle: normalizeString('Dịch Vụ Đặt Vé Máy Bay'),
        content:
          'Cung cấp dịch vụ đặt vé máy bay nhanh chóng, dễ dàng với nhiều lựa chọn hãng bay và điểm đến...',
        serviceType: ServiceType.BOOKING,
        priority: 1,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'dat-ve-may-bay-2',
        title: 'Dịch Vụ Đặt Vé Máy Bay Quốc Tế',
        searchTitle: normalizeString('Dịch Vụ Đặt Vé Máy Bay Quốc Tế'),
        content:
          'Dịch vụ đặt vé máy bay quốc tế với các mức giá cạnh tranh và nhiều lựa chọn đường bay...',
        serviceType: ServiceType.BOOKING,
        priority: 2,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },

      // Dịch vụ thuê xe
      {
        slug: 'thue-xe',
        title: 'Dịch Vụ Thuê Xe',
        searchTitle: normalizeString('Dịch Vụ Thuê Xe'),
        content:
          'Cho thuê các loại xe ô tô, xe máy phục vụ cho các chuyến đi du lịch hoặc công tác...',
        serviceType: ServiceType.CARRENTAL,
        priority: 3,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'thue-xe-gia-re',
        title: 'Dịch Vụ Thuê Xe Giá Rẻ',
        searchTitle: normalizeString('Dịch Vụ Thuê Xe Giá Rẻ'),
        content:
          'Dịch vụ thuê xe với mức giá cạnh tranh, phục vụ nhu cầu đi lại linh hoạt cho khách hàng...',
        serviceType: ServiceType.CARRENTAL,
        priority: 4,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },

      // Dịch vụ xin visa
      {
        slug: 'ho-tro-xin-visa',
        title: 'Dịch Vụ Xin Visa',
        searchTitle: normalizeString('Dịch Vụ Xin Visa'),
        content:
          'Hỗ trợ làm thủ tục xin visa du lịch nhanh chóng và dễ dàng, đảm bảo uy tín và tin cậy...',
        serviceType: ServiceType.VISA,
        priority: 5,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'xin-visa-cho-du-lich',
        title: 'Dịch Vụ Xin Visa Du Lịch',
        searchTitle: normalizeString('Dịch Vụ Xin Visa Du Lịch'),
        content:
          'Dịch vụ xin visa cho các chuyến du lịch quốc tế với quy trình nhanh chóng và đơn giản...',
        serviceType: ServiceType.VISA,
        priority: 6,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },

      // Dịch vụ xin hộ chiếu
      {
        slug: 'ho-tro-xin-ho-chieu',
        title: 'Dịch Vụ Xin Hộ Chiếu',
        searchTitle: normalizeString('Dịch Vụ Xin Hộ Chiếu'),
        content:
          'Dịch vụ hỗ trợ làm thủ tục xin cấp hộ chiếu mới hoặc gia hạn hộ chiếu hiện có...',
        serviceType: ServiceType.PASSPORT,
        priority: 7,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'xin-ho-chieu-nhanh',
        title: 'Dịch Vụ Xin Hộ Chiếu Nhanh',
        searchTitle: normalizeString('Dịch Vụ Xin Hộ Chiếu Nhanh'),
        content:
          'Dịch vụ làm hộ chiếu nhanh chóng, giúp bạn có hộ chiếu trong thời gian ngắn nhất...',
        serviceType: ServiceType.PASSPORT,
        priority: 8,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },

      // Dịch vụ đặt vé sự kiện
      {
        slug: 'dat-ve-su-kien',
        title: 'Dịch Vụ Đặt Vé Sự Kiện',
        searchTitle: normalizeString('Dịch Vụ Đặt Vé Sự Kiện'),
        content:
          'Dịch vụ đặt vé tham gia các sự kiện âm nhạc, thể thao, hội nghị quốc tế một cách dễ dàng...',
        serviceType: ServiceType.TICKET,
        priority: 9,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'dat-ve-su-kien-gia-re',
        title: 'Dịch Vụ Đặt Vé Sự Kiện Giá Rẻ',
        searchTitle: normalizeString('Dịch Vụ Đặt Vé Sự Kiện Giá Rẻ'),
        content:
          'Đặt vé tham gia các sự kiện với giá ưu đãi, giúp bạn không bỏ lỡ những sự kiện hấp dẫn...',
        serviceType: ServiceType.TICKET,
        priority: 10,
        price: 100000,
        thumbnail: 'https://vietasiatravel.net/files/files/US-EU.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
    ],
  });

  // Seed data for Schedules
  await prisma.schedule.createMany({
    data: [
      {
        slug: 'lich-trinh-1',
        title: 'Khám Phá Toàn Diện Việt Nam',
        searchTitle: normalizeString('Khám Phá Toàn Diện Việt Nam'),
        content:
          'Lịch trình khám phá Việt Nam bao gồm các điểm tham quan nổi tiếng từ Bắc vào Nam, trải nghiệm văn hóa và ẩm thực đặc sắc tại từng vùng miền. Chuyến đi kéo dài trong 10 ngày với lịch trình chi tiết từ Hà Nội, Hạ Long, Huế, Đà Nẵng, Hội An đến TP.HCM và Cần Thơ. Khách du lịch sẽ được tận hưởng những khoảnh khắc tuyệt vời bên gia đình và bạn bè trong chuyến phiêu lưu này.',
        type: TourType.VIETNAMTOUR,
        priority: 1,
        thumbnail:
          'https://vietasiatravel.net/files/files/sing%20ma%20in%2012490.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-2',
        title: 'Tour Tham Quan Thành Phố Hà Nội',
        searchTitle: normalizeString('Tour Tham Quan Thành Phố Hà Nội'),
        content:
          'Lịch trình khám phá những địa điểm văn hóa, lịch sử nổi bật tại thủ đô Hà Nội như Văn Miếu, Hồ Gươm, Phố Cổ, Lăng Chủ Tịch Hồ Chí Minh và Chùa Một Cột. Tour kéo dài 1 ngày, phù hợp cho du khách muốn khám phá nhanh thành phố với các hoạt động văn hóa phong phú và ẩm thực địa phương hấp dẫn.',
        type: TourType.VIETNAMTOUR,
        priority: 2,
        thumbnail:
          'https://vietasiatravel.net/files/files/sing%20ma%20in%2012490.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-3',
        title: 'Những Điểm Nổi Bật Của Sài Gòn',
        searchTitle: normalizeString('Những Điểm Nổi Bật Của Sài Gòn'),
        content:
          'Khám phá thành phố năng động nhất Việt Nam - TP.HCM qua các điểm nổi bật như Dinh Độc Lập, Nhà Thờ Đức Bà, Chợ Bến Thành và Phố Tây Bùi Viện. Lịch trình linh hoạt kéo dài 2 ngày với các hoạt động khám phá văn hóa và ẩm thực đường phố, mang lại trải nghiệm khó quên cho du khách.',
        type: TourType.VIETNAMTOUR,
        priority: 3,
        thumbnail:
          'https://vietasiatravel.net/files/files/sing%20ma%20in%2012490.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-4',
        title: 'Khám Phá Đà Nẵng và Hội An',
        searchTitle: normalizeString('Khám Phá Đà Nẵng và Hội An'),
        content:
          'Tour 4 ngày 3 đêm đưa du khách đến Đà Nẵng và Hội An. Khám phá các điểm đến nổi tiếng như Bà Nà Hills, Ngũ Hành Sơn, và Phố Cổ Hội An với những ngôi nhà cổ kính, chợ đêm nhộn nhịp. Thưởng thức ẩm thực độc đáo của miền Trung, với các món ăn đặc sản địa phương.',
        type: TourType.VIETNAMTOUR,
        priority: 4,
        thumbnail:
          'https://vietasiatravel.net/files/files/sing%20ma%20in%2012490.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-5',
        title: 'Tour Khám Phá Vịnh Hạ Long',
        searchTitle: normalizeString('Tour Khám Phá Vịnh Hạ Long'),
        content:
          'Chuyến đi 2 ngày 1 đêm tại Vịnh Hạ Long, nơi có hàng ngàn đảo đá vôi kỳ vĩ. Du khách sẽ được tham gia các hoạt động như chèo kayak, tham quan hang động và thưởng thức hải sản tươi ngon trên du thuyền giữa lòng vịnh. Một trải nghiệm không thể bỏ lỡ cho những ai yêu thích thiên nhiên.',
        type: TourType.VIETNAMTOUR,
        priority: 5,
        thumbnail:
          'https://vietasiatravel.net/files/files/sing%20ma%20in%2012490.png',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-6',
        title: 'Khám Phá Tokyo, Nhật Bản',
        searchTitle: normalizeString('Khám Phá Tokyo, Nhật Bản'),
        content:
          'Chuyến đi 5 ngày 4 đêm đến Tokyo, khám phá những điểm đến nổi tiếng như Tháp Tokyo, Chùa Senso-ji, và khu phố Shibuya sôi động. Du khách sẽ được trải nghiệm ẩm thực độc đáo, tham quan các khu vườn truyền thống và tham gia các hoạt động văn hóa địa phương như học làm sushi.',
        type: TourType.GLOBALTOUR,
        priority: 6,
        thumbnail: 'https://vietasiatravel.net/files/files/tokyo.jpg',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-7',
        title: 'Khám Phá Paris, Pháp',
        searchTitle: normalizeString('Khám Phá Paris, Pháp'),
        content:
          'Tour 7 ngày 6 đêm tại Paris, thành phố ánh sáng. Du khách sẽ tham quan các điểm nổi tiếng như Tháp Eiffel, Bảo tàng Louvre, và Nhà thờ Đức Bà. Ngoài ra, du khách còn có cơ hội thưởng thức ẩm thực Pháp tại các nhà hàng sang trọng và tham gia vào các buổi biểu diễn nghệ thuật tại nhà hát nổi tiếng.',
        type: TourType.GLOBALTOUR,
        priority: 7,
        thumbnail: 'https://vietasiatravel.net/files/files/paris.jpg',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-8',
        title: 'Khám Phá New York, Mỹ',
        searchTitle: normalizeString('Khám Phá New York, Mỹ'),
        content:
          'Chuyến đi 6 ngày 5 đêm đến New York, nơi du khách sẽ khám phá các biểu tượng nổi tiếng như Tượng Nữ thần Tự do, Central Park và Times Square. Lịch trình bao gồm cả việc tham gia vào các hoạt động giải trí sôi động và trải nghiệm ẩm thực đa dạng từ các nền văn hóa khác nhau.',
        type: TourType.GLOBALTOUR,
        priority: 8,
        thumbnail: 'https://vietasiatravel.net/files/files/newyork.jpg',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-9',
        title: 'Khám Phá Sydney, Úc',
        searchTitle: normalizeString('Khám Phá Sydney, Úc'),
        content:
          'Tour 8 ngày 7 đêm khám phá Sydney với những điểm đến nổi bật như Nhà hát Sydney, Cầu cảng Sydney và bãi biển Bondi. Du khách có cơ hội tham gia vào các hoạt động ngoài trời, từ lặn biển đến đi bộ đường dài, và thưởng thức các món ăn địa phương tươi ngon.',
        type: TourType.GLOBALTOUR,
        priority: 9,
        thumbnail: 'https://vietasiatravel.net/files/files/sydney.jpg',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
      {
        slug: 'lich-trinh-10',
        title: 'Khám Phá Bali, Indonesia',
        searchTitle: normalizeString('Khám Phá Bali, Indonesia'),
        content:
          'Chuyến đi 5 ngày 4 đêm đến Bali, nơi du khách sẽ thưởng thức các bãi biển tuyệt đẹp, tham quan các ngôi đền truyền thống và trải nghiệm văn hóa Balinese đặc sắc. Lịch trình bao gồm các hoạt động thư giãn tại spa, tham gia lớp học nấu ăn và khám phá thiên nhiên tươi đẹp của đảo.',
        type: TourType.GLOBALTOUR,
        priority: 10,
        thumbnail: 'https://vietasiatravel.net/files/files/bali.jpg',
        createdById: users[0].id,
        updatedById: users[0].id,
      },
    ],
  });

  // Seed data for News
  const newsItems = [
    {
      slug: 'du-lich-kham-pha-can-gio',
      title: 'DU LỊCH KHÁM PHÁ CẦN GIỜ',
      searchTitle: 'Du Lich Kham Pha Can Gio'.toLowerCase(),
      content:
        "Cần Giờ là một địa điểm du lịch hấp dẫn với những đường bờ biển dài, những cánh rừng ngập mặn bạt ngàn và vô vàn món ăn tươi ngon từ hải sản. Với những đặc điểm này, Cần Giờ được ví như một 'ốc đảo xanh' nằm cạnh Sài Gòn nhộn nhịp. Hãy cùng Công ty Du lịch Việt Châu Á ghi lại khoảnh khắc tuyệt vời cùng gia đình và bạn bè nhé!",
      type: NewsType.NEWS,
      priority: 6,
      thumbnail: 'https://vietasiatravel.net/files/files/CH.png',
      createdById: users[0].id,
      updatedById: users[0].id,
    },
    {
      slug: 'du-lich-kham-pha-gian-gua',
      title: 'DU LỊCH KHÁM PHÁ KHU DI TÍCH GIÀN GỪA',
      searchTitle: 'Du Lich Kham Pha Khu Di Tich Gian Gua'.toLowerCase(),
      content:
        'Bạn có muốn khám phá một địa điểm mang đậm dấu ấn lịch sử và văn hóa miền Tây không? Giàn Gừa ở Cần Thơ chính là điểm đến lý tưởng cho bạn! Nơi đây vừa là nơi ghi dấu những cuộc chiến đấu kiên cường của dân tộc vừa là nơi có cảnh sắc huyền bí thơ mộng đang đợi bạn khám phá. Đừng bỏ lỡ cơ hội khám phá Giàn Gừa! Hãy lên kế hoạch cho chuyến đi của bạn ngay hôm nay để trải nghiệm một trong những điều tuyệt vời nhất mà Cần Thơ mang lại!',
      type: NewsType.NEWS,
      priority: 6,
      thumbnail: 'https://vietasiatravel.net/files/files/gt.png',
      createdById: users[0].id,
      updatedById: users[0].id,
    },
    {
      slug: 'du-lich-kham-pha-co-to',
      title: 'DU LỊCH KHÁM PHÁ CÔ TÔ',
      searchTitle: 'Du Lich Kham Pha Co To'.toLowerCase(),
      content:
        'Bạn đã sẵn sàng cho một cuộc phiêu lưu đầy sắc màu tại hòn đảo hoang sơ Cô Tô, Quảng Ninh chưa? Hãy để chúng tôi đưa bạn đến nơi hội tụ vẻ đẹp thiên nhiên tuyệt mỹ và trải nghiệm khó quên. Hãy nhanh tay liên hệ với CTY DU LỊCH VIỆT CHÂU Á để chiêm ngưỡng hết vẻ đẹp của Cô Tô và có những trải nghiệm thú vị và vui vẻ tại nơi đây!',
      type: NewsType.NEWS,
      priority: 6,
      thumbnail: 'https://vietasiatravel.net/files/files/CT.png',
      createdById: users[0].id,
      updatedById: users[0].id,
    },
    {
      slug: 'du-lich-phong-nha-ke-bang',
      title: 'KHÁM PHÁ PHONG NHA - NHA KẺ',
      searchTitle: 'Kham Pha Phong Nha - Ke Bang'.toLowerCase(),
      content:
        'Phong Nha - Kẻ Bàng là Di sản Thiên nhiên Thế giới nằm ở tỉnh Quảng Bình, Việt Nam, nổi tiếng với hệ thống hang động kỳ vĩ và những cánh rừng nguyên sinh rộng lớn. Phong Nha - Kẻ Bàng không chỉ là nơi chứa đựng những tuyệt tác của thiên nhiên mà còn ẩn chứa vô vàn bí ẩn đang chờ đợi những ai đam mê khám phá! Hãy nhanh tay liên hệ với CTY DU LỊCH VIỆT CHÂU Á để chiêm ngưỡng hết vẻ đẹp của Phong Nha - Kẻ Bàng và có những trải nghiệm thú vị và vui vẻ tại Quảng Bình!',
      type: NewsType.NEWS,
      priority: 6,
      thumbnail: 'https://vietasiatravel.net/files/files/pn.png',
      createdById: users[0].id,
      updatedById: users[0].id,
    },
    {
      slug: 'du-lich-da-lat',
      title: 'DU LỊCH ĐÀ LẠT',
      searchTitle: 'Du Lich Da Lat'.toLowerCase(),
      content:
        'Khi những vườn hồng ẩn hiện chấm đỏ trên nền lá xanh thì cũng là lúc mùa thu mơ màng của Đà Lạt đã về. Hãy đến với CTY DU LỊCH VIỆT CHÂU Á để có thể thưởng thức những trái hồng ngọt ngào cũng như có những trải nghiệm thú vị và vui vẻ tại Đà Lạt!',
      type: NewsType.NEWS,
      priority: 6,
      thumbnail: 'https://vietasiatravel.net/files/files/%C4%90K.png',
      createdById: users[0].id,
      updatedById: users[0].id,
    },
    {
      slug: 'du-lich-ninh-thuan',
      title: 'DU LỊCH NINH THUẬN',
      searchTitle: 'Du Lich Ninh Thuan'.toLowerCase(),
      content:
        "Ninh Thuận không chỉ có nắng và gió mà trong mắt mình, nơi đây còn là vùng biển đẹp nhất Việt Nam. Đặc biệt, khi chạy xe máy trên cung đường ven biển Ninh Thuận: vịnh Vĩnh Hy - Mũi Dinh - Cà Ná, mình chỉ biết thốt lên: 'Việt Nam ơi sao đẹp quá! Hãy liên hệ ngay CTY DU LỊCH VIỆT CHÂU Á để có những trải nghiệm thú vị và tuyệt vời tại Ninh Thuận!'",
      type: NewsType.NEWS,
      priority: 6,
      thumbnail: 'https://vietasiatravel.net/files/files/NT.png',
      createdById: users[0].id,
      updatedById: users[0].id,
    },
  ];

  const preparedNewsItems = createNewsData(newsItems);

  await prisma.news.createMany({
    data: preparedNewsItems,
  });

  await prisma.media.createMany({
    data: [
      {
        mediaUrl:
          'https://vietasiatravel.net/files/images/Trung%20Qu%E1%BB%91c/tour-phuquoc-3ngay%20(5).jpg',
        mediaType: MediaType.IMAGE,
        createdById: users[0].id,
      },
      {
        mediaUrl:
          'https://vietasiatravel.net/files/images/Trung%20Qu%E1%BB%91c/tour-thailan-dalat%20(2).jpg',
        mediaType: MediaType.IMAGE,
        createdById: users[0].id,
      },
      {
        mediaUrl:
          'https://vietasiatravel.net/files/images/Trung%20Qu%E1%BB%91c/du-lich-phu-quoc1.jpg',
        mediaType: MediaType.IMAGE,
        createdById: users[0].id,
      },
      {
        mediaUrl: 'https://youtu.be/3xKzoH3jI8o',
        mediaType: MediaType.VIDEO,
        createdById: users[0].id,
      },
      {
        mediaUrl: 'https://youtu.be/idikTInQdtE',
        mediaType: MediaType.VIDEO,
        createdById: users[0].id,
      },
      {
        mediaUrl: 'https://youtu.be/tKpKqfc3j6U',
        mediaType: MediaType.VIDEO,
        createdById: users[0].id,
      },
    ],
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export function generateCategoryId(name) {
  return name
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize to separate accent from letters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/đ/g, 'd') // Convert 'đ' to 'd'
    .replace(/[^a-z0-9\s]/g, '') // Remove all non-alphanumeric characters except spaces
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

export function normalizeString(str: string) {
  const from =
    'áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ';
  const to =
    'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
  for (let i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from[i], 'gi'), to[i]);
  }
  return str.toLowerCase();
}

function createNewsData(newsItems) {
  return newsItems.map((item) => ({
    ...item,
    subContent: item.content,
  }));
}
