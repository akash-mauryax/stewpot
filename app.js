// Stewpot Communications - Main Interactive Application Script

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initGrowthChart();
  initSolutionsFilter();
  initEstimator();
  initCycleDiagram();
  initContactForm();
  initMobileMenu();
  initStatCounters();
  initModals();
});

// --- Theme Management ---
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Default to dark mode for high-tech executive feel
  const savedTheme = localStorage.getItem('stewpot-theme') || 'dark';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun text-yellow-400';
  } else {
    document.documentElement.classList.remove('dark');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon text-slate-700';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('stewpot-theme', isDark ? 'dark' : 'light');
      if (themeIcon) {
        themeIcon.className = isDark ? 'fa-solid fa-sun text-yellow-400' : 'fa-solid fa-moon text-slate-700';
      }
      updateChartTheme();
    });
  }
}

// --- Revenue Growth Chart (Chart.js) with Page 6 Data ---
let growthChart = null;

const chartDataValues = [
  { year: '2019-2020', value: 175157, display: '₹1.75 Lakhs', note: 'Company Inception & Regional Networking Contracts', yoy: '-' },
  { year: '2020-2021', value: 190860, display: '₹1.91 Lakhs', note: 'Pandemic Remote-Work & Workplace Hardware Deployment', yoy: '+8.9%' },
  { year: '2021-2022', value: 756382, display: '₹7.56 Lakhs', note: 'Tier-1 Partnerships with Cisco, HPE & Palo Alto', yoy: '+296.3%' },
  { year: '2022-2023', value: 5342719, display: '₹53.43 Lakhs', note: 'Enterprise Cloud & Smart Surveillance Scale-up', yoy: '+606.3%' },
  { year: '2023-2024', value: 21087983, display: '₹2.11 Crores', note: 'Surpassed ₹2Cr Milestone with Multi-site Enterprise Contracts', yoy: '+294.7%' },
  { year: '2024-2025', value: 29643333.97, display: '₹2.96 Crores', note: 'All-Time Record: ₹2.96+ Crores across 21+ Global Tech Alliances', yoy: '+40.6%' }
];

function initGrowthChart() {
  const ctx = document.getElementById('growthChartCanvas');
  if (!ctx) return;

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#cbd5e1' : '#334155';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

  const labels = chartDataValues.map(d => d.year);
  const data = chartDataValues.map(d => d.value);

  // Bar colors matching PDF page 6:
  // 2019-20: Blue, 2020-21: Cyan/Teal, 2021-22: Red, 2022-23: Purple, 2023-24: Orange, 2024-25: Emerald Green
  const barColors = [
    '#3b82f6', // blue
    '#06b6d4', // cyan
    '#ef4444', // red
    '#a855f7', // purple
    '#f97316', // orange
    '#10b981'  // green
  ];

  growthChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Annual Revenue (INR ₹)',
          data: data,
          backgroundColor: barColors,
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.65,
          order: 2
        },
        {
          label: 'Growth Trajectory',
          data: data,
          type: 'line',
          borderColor: '#e11d48',
          borderWidth: 3,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#e11d48',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 9,
          tension: 0.35,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: textColor,
            font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 }
          }
        },
        tooltip: {
          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          titleColor: isDark ? '#ffffff' : '#0f172a',
          bodyColor: isDark ? '#cbd5e1' : '#334155',
          borderColor: '#e11d48',
          borderWidth: 1,
          padding: 14,
          boxPadding: 6,
          usePointStyle: true,
          callbacks: {
            label: function(context) {
              const item = chartDataValues[context.dataIndex];
              const raw = item.value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
              return ` Revenue: ₹${raw} (${item.display})`;
            },
            afterBody: function(contexts) {
              const index = contexts[0].dataIndex;
              const item = chartDataValues[index];
              return `\nYoY Surge: ${item.yoy}\nMilestone: ${item.note}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: textColor,
            font: { family: 'Plus Jakarta Sans', weight: 600 }
          }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { family: 'Plus Jakarta Sans' },
            callback: function(val) {
              if (val >= 10000000) return '₹' + (val / 10000000).toFixed(1) + ' Cr';
              if (val >= 100000) return '₹' + (val / 100000).toFixed(1) + ' L';
              return '₹' + val;
            }
          }
        }
      }
    }
  });

  // Setup Chart View Toggles
  const btnBar = document.getElementById('view-bar-btn');
  const btnLine = document.getElementById('view-line-btn');
  
  if (btnBar && btnLine) {
    btnBar.addEventListener('click', () => {
      btnBar.classList.add('bg-rose-600', 'text-white');
      btnBar.classList.remove('bg-slate-800', 'text-slate-300', 'bg-slate-200');
      btnLine.classList.remove('bg-rose-600', 'text-white');
      btnLine.classList.add('bg-slate-800', 'text-slate-300');

      growthChart.config.type = 'bar';
      growthChart.data.datasets[0].hidden = false;
      growthChart.data.datasets[1].hidden = false;
      growthChart.update();
    });

    btnLine.addEventListener('click', () => {
      btnLine.classList.add('bg-rose-600', 'text-white');
      btnLine.classList.remove('bg-slate-800', 'text-slate-300');
      btnBar.classList.remove('bg-rose-600', 'text-white');
      btnBar.classList.add('bg-slate-800', 'text-slate-300');

      growthChart.config.type = 'line';
      growthChart.data.datasets[0].hidden = true;
      growthChart.data.datasets[1].hidden = false;
      growthChart.data.datasets[1].fill = true;
      growthChart.data.datasets[1].backgroundColor = 'rgba(225, 29, 72, 0.15)';
      growthChart.update();
    });
  }
}

function updateChartTheme() {
  if (!growthChart) return;
  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#cbd5e1' : '#334155';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

  growthChart.options.scales.x.ticks.color = textColor;
  growthChart.options.scales.y.ticks.color = textColor;
  growthChart.options.scales.y.grid.color = gridColor;
  growthChart.options.plugins.legend.labels.color = textColor;
  growthChart.update();
}

// --- Solutions Category Filtering ---
function initSolutionsFilter() {
  const filterButtons = document.querySelectorAll('.solution-filter-btn');
  const solutionCards = document.querySelectorAll('.solution-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('tab-active', 'bg-rose-600', 'text-white');
        b.classList.add('text-slate-400', 'hover:text-white');
      });

      btn.classList.add('tab-active', 'bg-rose-600', 'text-white');
      btn.classList.remove('text-slate-400');

      const category = btn.getAttribute('data-category');

      solutionCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Interactive Solution & Infrastructure Estimator ---
function initEstimator() {
  const teamSizeSelect = document.getElementById('calc-team-size');
  const hardwareChecks = document.querySelectorAll('.calc-hardware');
  const networkingSelect = document.getElementById('calc-networking');
  const cloudSelect = document.getElementById('calc-cloud');
  const securitySelect = document.getElementById('calc-security');
  const cctvSelect = document.getElementById('calc-cctv');

  const resultPartnersEl = document.getElementById('calc-res-partners');
  const resultTimelineEl = document.getElementById('calc-res-timeline');
  const resultSlaEl = document.getElementById('calc-res-sla');
  const resultSummaryEl = document.getElementById('calc-res-summary');
  const copyToRfpBtn = document.getElementById('calc-copy-rfp');

  function calculateConfig() {
    if (!teamSizeSelect) return;
    
    const teamSize = teamSizeSelect.value;
    const selectedPartners = new Set();
    let timelineWeeks = 1;
    let slaTier = '99.9% Business Hours SLA';

    // Hardware
    hardwareChecks.forEach(cb => {
      if (cb.checked) {
        if (cb.value === 'workstations' || cb.value === 'laptops') {
          selectedPartners.add('Lenovo');
          selectedPartners.add('HP Inc.');
        }
        if (cb.value === 'printers') selectedPartners.add('HP Inc.');
        if (cb.value === 'displays') {
          selectedPartners.add('Samsung');
          selectedPartners.add('LG');
          selectedPartners.add('Sony');
        }
      }
    });

    // Networking
    if (networkingSelect && networkingSelect.value !== 'none') {
      selectedPartners.add(networkingSelect.value);
      timelineWeeks += 1;
    }

    // Cloud / Compute
    if (cloudSelect && cloudSelect.value !== 'none') {
      selectedPartners.add(cloudSelect.value);
      timelineWeeks += 1;
    }

    // Security
    if (securitySelect && securitySelect.value !== 'none') {
      selectedPartners.add(securitySelect.value);
    }

    // CCTV / Physical Access
    if (cctvSelect && cctvSelect.value !== 'none') {
      selectedPartners.add(cctvSelect.value);
      timelineWeeks += 1;
    }

    if (teamSize === 'enterprise') {
      slaTier = '24/7/365 Dedicated NOC Support & 2-Hour MTTR';
      timelineWeeks += 2;
    } else if (teamSize === 'midmarket') {
      slaTier = '24/7 Remote Monitoring & 4-Hour Onsite SLA';
      timelineWeeks += 1;
    }

    // Render results
    const partnerList = Array.from(selectedPartners);
    if (resultPartnersEl) {
      if (partnerList.length === 0) {
        resultPartnersEl.innerHTML = '<span class="text-slate-400">Select components above to preview certified OEMs</span>';
      } else {
        resultPartnersEl.innerHTML = partnerList.map(p => 
          `<span class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-semibold">
            <i class="fa-solid fa-circle-check text-[10px]"></i> ${p}
          </span>`
        ).join('');
      }
    }

    if (resultTimelineEl) {
      resultTimelineEl.textContent = `${timelineWeeks} to ${timelineWeeks + 2} Weeks Turnkey Deployment`;
    }

    if (resultSlaEl) {
      resultSlaEl.textContent = slaTier;
    }

    if (resultSummaryEl) {
      resultSummaryEl.textContent = `Configured for ${teamSize.toUpperCase()} tier with ${partnerList.length} integrated OEM technology layers. Complete with initial audit, certified configuration, zero-downtime cutover, and post-launch SLA.`;
    }
  }

  // Listen for changes
  if (teamSizeSelect) teamSizeSelect.addEventListener('change', calculateConfig);
  if (networkingSelect) networkingSelect.addEventListener('change', calculateConfig);
  if (cloudSelect) cloudSelect.addEventListener('change', calculateConfig);
  if (securitySelect) securitySelect.addEventListener('change', calculateConfig);
  if (cctvSelect) cctvSelect.addEventListener('change', calculateConfig);
  hardwareChecks.forEach(cb => cb.addEventListener('change', calculateConfig));

  // Run initial calculation
  calculateConfig();

  // Copy to RFP Button
  if (copyToRfpBtn) {
    copyToRfpBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const messageField = document.getElementById('rfp-message');
      const serviceField = document.getElementById('rfp-service');

      if (serviceField) serviceField.value = 'Integrated Enterprise Stack';

      const hwSelected = Array.from(hardwareChecks).filter(c => c.checked).map(c => c.value).join(', ');
      const msg = `Automated RFP Configuration:\n- Organization Tier: ${teamSizeSelect.value}\n- Hardware Components: ${hwSelected || 'Custom'}\n- Core Networking: ${networkingSelect.value}\n- Cloud/Server: ${cloudSelect.value}\n- Cybersecurity: ${securitySelect.value}\n- Surveillance/Access: ${cctvSelect.value}\n\nPlease prepare an official proposal and schedule an introductory architecture assessment.`;
      
      if (messageField) messageField.value = msg;

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // highlight message field
        if (messageField) {
          messageField.classList.add('ring-2', 'ring-rose-500');
          setTimeout(() => messageField.classList.remove('ring-2', 'ring-rose-500'), 2500);
        }
      }
    });
  }
}

// --- Interactive 3-Pillar Cycle Model (Page 7) ---
function initCycleDiagram() {
  const pillars = {
    p1: {
      title: '1. Open Communication',
      quote: 'We partner with clients to make informed decisions. We foster open dialogue and transparency. We ensure that you are fully informed at every stage.',
      points: [
        'Weekly executive transparency dashboards and SLA metric reviews',
        'Direct, unhindered access to Principal IT Architects and certified OEM engineers',
        'Zero vendor bias: honest multi-brand recommendations based solely on client ROI',
        'Rapid escalation matrix with 24/7 dedicated account managers'
      ],
      icon: 'fa-solid fa-comments',
      badge: 'Transparency & Trust'
    },
    p2: {
      title: '2. Collaboration',
      quote: 'We work closely with your internal team. We leverage your existing domain expertise and institutional insights to build solutions that fit seamlessly.',
      points: [
        'Joint architectural workshops and threat modeling sessions',
        'Co-engineered migration plans with zero operational downtime',
        'Comprehensive knowledge transfer and hands-on staff enablement',
        'Flexible engagement: Turnkey execution, co-managed IT, or advisory oversight'
      ],
      icon: 'fa-solid fa-handshake',
      badge: 'Co-Engineering'
    },
    p3: {
      title: '3. Shared Vision',
      quote: 'We align technological investments directly with your 3-to-5 year strategic business objectives to ensure sustainable, long-term enterprise growth.',
      points: [
        'Total Cost of Ownership (TCO) optimization and lifecycle planning',
        'Scalable blueprint ready for future headcount and multi-branch expansion',
        'Ongoing technological updates as hardware and cybersecurity paradigms evolve',
        'Commitment to continuous improvement and measurable business impact'
      ],
      icon: 'fa-solid fa-bullseye',
      badge: 'Sustainable Growth'
    }
  };

  const wedgeBtns = document.querySelectorAll('.cycle-pillar-btn');
  const displayTitle = document.getElementById('pillar-display-title');
  const displayQuote = document.getElementById('pillar-display-quote');
  const displayPoints = document.getElementById('pillar-display-points');
  const displayBadge = document.getElementById('pillar-display-badge');
  const displayIcon = document.getElementById('pillar-display-icon');

  function renderPillar(key) {
    const data = pillars[key];
    if (!data) return;

    if (displayTitle) displayTitle.textContent = data.title;
    if (displayQuote) displayQuote.textContent = `“${data.quote}”`;
    if (displayBadge) displayBadge.textContent = data.badge;
    if (displayIcon) displayIcon.className = `${data.icon} text-rose-500 text-3xl`;

    if (displayPoints) {
      displayPoints.innerHTML = data.points.map(pt => 
        `<li class="flex items-start gap-3">
          <i class="fa-solid fa-check-circle text-rose-500 mt-1 flex-shrink-0"></i>
          <span class="text-slate-300">${pt}</span>
        </li>`
      ).join('');
    }

    wedgeBtns.forEach(btn => {
      if (btn.getAttribute('data-pillar') === key) {
        btn.classList.add('border-rose-500', 'bg-rose-500/10', 'text-rose-400');
        btn.classList.remove('border-slate-700', 'text-slate-400');
      } else {
        btn.classList.remove('border-rose-500', 'bg-rose-500/10', 'text-rose-400');
        btn.classList.add('border-slate-700', 'text-slate-400');
      }
    });
  }

  wedgeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-pillar');
      renderPillar(pKey);
    });
  });

  // Initial render
  renderPillar('p1');
}

// --- RFP / Consultation Form ---
function initContactForm() {
  const form = document.getElementById('rfp-form');
  const feedbackMsg = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rfp-name').value.trim();
    const email = document.getElementById('rfp-email').value.trim();
    const phone = document.getElementById('rfp-phone').value.trim();
    const company = document.getElementById('rfp-company').value.trim();
    const service = document.getElementById('rfp-service').value;
    const message = document.getElementById('rfp-message').value.trim();

    if (!name || !email) {
      alert('Please fill out your Name and Corporate Email.');
      return;
    }

    const refNumber = 'STW-' + Math.floor(100000 + Math.random() * 900000);

    // Show celebratory animation if confetti is loaded
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    // Success response UI
    if (feedbackMsg) {
      feedbackMsg.classList.remove('hidden');
      feedbackMsg.innerHTML = `
        <div class="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-start gap-3">
          <i class="fa-solid fa-circle-check text-xl mt-0.5"></i>
          <div>
            <h4 class="font-bold text-white">Inquiry Submitted Successfully! (Ref: #${refNumber})</h4>
            <p class="text-sm text-slate-300 mt-1">
              Thank you, <strong>${name}</strong>. Our Principal Technology Consultant will contact you at <strong>${email}</strong> within 4 business hours.
            </p>
            <div class="mt-3 flex gap-3">
              <a href="mailto:info@stewpot.co.in?subject=RFP Inquiry [${refNumber}]: ${encodeURIComponent(company || name)} - ${encodeURIComponent(service)}&body=${encodeURIComponent('Client: ' + name + '\nCompany: ' + company + '\nPhone: ' + phone + '\nEmail: ' + email + '\nService: ' + service + '\n\nScope:\n' + message)}"
                 class="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors">
                <i class="fa-solid fa-envelope"></i> Open in Outlook / Mail App
              </a>
            </div>
          </div>
        </div>
      `;
    }

    // Optional: form.reset() after a few seconds
  });
}

// --- Mobile Navigation ---
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// --- Animated Stat Counters ---
function initStatCounters() {
  const counterElements = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target'));
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const decimals = parseInt(el.getAttribute('data-decimals') || '0');
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeProgress;

            el.textContent = prefix + currentVal.toFixed(decimals) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = prefix + target.toFixed(decimals) + suffix;
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-strip');
  if (statsSection) observer.observe(statsSection);
}

// --- Solution Details Modals ---
const solutionDetailsData = {
  hardware: {
    title: 'Enterprise Workplace Hardware & Computing',
    partners: ['HP Inc.', 'Lenovo', 'Samsung', 'LG'],
    summary: 'Turnkey workplace computing supply and lifecycle management. From high-power engineering workstations to executive ultrabooks, multi-function laser printing, and commercial smart display setups.',
    specs: [
      'Commercial Laptops & Desktops: Lenovo ThinkPad / HP EliteBook series with enterprise TPM 2.0 & vPro',
      'High-Performance Workstations: CAD/BIM/AI simulation workstations with dedicated NVIDIA RTX GPUs',
      'Multifunctional Network Printers: Secure duplex laser printers with PIN release and usage auditing',
      'Commercial Displays & TV: 4K Ultra-HD conference panels and digital signage with centralized CMS',
      'Server Room Air Conditioning (AC): Precision climate control and thermal regulation for IT racks'
    ],
    timeline: 'Standard deployments: 7-14 business days across India.',
    sla: '3 to 5-year OEM on-site warranty + 4-hour Stewpot rapid replacement pool.'
  },
  networking: {
    title: 'Enterprise Networking & Seamless Connectivity',
    partners: ['Cisco', 'Aruba Networks', 'Ruckus CommScope'],
    summary: 'Carrier-grade switching, high-density Wi-Fi 6/7 campus wireless, software-defined WAN (SD-WAN), and core routing engineered for uninterrupted business continuity.',
    specs: [
      'Core & Access Switching: Cisco Catalyst / Aruba CX high-availability multi-gigabit switches',
      'Next-Gen Wireless: Ruckus & Aruba Wi-Fi 6E/7 access points with AI RF beamforming',
      'Software-Defined WAN: Cisco Meraki & Aruba SD-WAN for branch-to-cloud automated failover',
      'Zero-Loss Redundancy: Multi-ISP load balancing, dual core fabric, and VRRP resilience',
      'Campus Network Assessment: Wi-Fi heatmapping, spectral interference analysis, and bandwidth auditing'
    ],
    timeline: 'Design, configuration & rollout in 2 to 4 weeks.',
    sla: '99.99% network availability with proactive SNMP monitoring.'
  },
  security: {
    title: 'Next-Generation Cybersecurity & Threat Defense',
    partners: ['Palo Alto Networks', 'Sophos', 'Trend Micro', 'Hikvision'],
    summary: 'Multi-layered perimeter defense, Next-Gen Firewalls (NGFW), zero-trust network access (ZTNA), and AI-driven Endpoint Detection & Response (EDR) to safeguard enterprise intellectual property.',
    specs: [
      'Next-Gen Firewalls (NGFW): Palo Alto Networks PA-Series & Sophos XGS with deep packet SSL inspection',
      'Endpoint Detection & Response: Sophos Intercept X & Trend Micro Apex One with ransomware rollback',
      'Zero Trust Network Access (ZTNA): Identity-based granular least-privilege remote access',
      'Email & Data Security: Advanced phishing simulation, DLP, and DNS-layer protective filtering',
      'Compliance & Audit: ISO 27001, SOC2, and CERT-In readiness diagnostics'
    ],
    timeline: 'Initial security posture audit within 48 hours; full enforcement in 10-15 days.',
    sla: '24/7 Security Operations Center (SOC) alert triage with 15-minute critical incident response.'
  },
  cloud: {
    title: 'Scalable Cloud Services & IT Infrastructure',
    partners: ['HPE (Hewlett Packard Enterprise)', 'Lenovo', 'HP Inc.'],
    summary: 'Modernize legacy infrastructure with high-density hyperconverged server compute, scalable SAN storage arrays, hybrid multi-cloud virtualization, and automated immutable disaster recovery.',
    specs: [
      'Enterprise Servers: HPE ProLiant DL/ML rack servers and Lenovo ThinkSystem hyper-converged blades',
      'SAN & Hybrid Storage: High-IOPS all-flash NVMe arrays with inline deduplication and compression',
      'Cloud Migration: Seamless migration to AWS, Microsoft Azure, and private hybrid cloud stacks',
      'Backup & Disaster Recovery: Air-gapped immutable backup repositories ensuring zero data loss',
      'Virtualization: VMware ESXi, Proxmox VE, and Microsoft Hyper-V certified architectures'
    ],
    timeline: 'Server procurement, staging & migration in 2-3 weeks.',
    sla: '99.98% infrastructure uptime guarantee with 24/7 hardware monitoring.'
  },
  surveillance: {
    title: 'State-of-the-Art Surveillance & Physical Access Systems',
    partners: ['Hikvision', 'Hanwha Ocean / Hanwha Vision', 'eSSL', 'Axis Communications'],
    summary: 'Integrated physical security combining AI-powered IP CCTV surveillance, facial recognition attendance, smart biometric turnstiles, and centralized command-and-control operations centers.',
    specs: [
      'AI Video Analytics: Hikvision DeepinView & Axis cameras with license plate recognition & perimeter tripping',
      'Biometric Access Control: eSSL facial recognition, palm vein scanners, and RFID card access controllers',
      'Central Video Management (VMS): Multi-location centralized recording with 90-day RAID redundancy',
      'Industrial Intrusion Detection: Hanwha optical and thermal sensors for campus perimeter protection',
      'Mobile Access: Real-time mobile alerts, push notifications, and remote PTZ control'
    ],
    timeline: 'Turnkey cabling, camera mounting, and NVR configuration in 10-20 days.',
    sla: '1-Year comprehensive maintenance contract (CMC) with free quarterly camera alignment audits.'
  },
  consulting: {
    title: 'Strategic Business & Technology Consulting',
    partners: ['Stewpot Certified Executive Advisory'],
    summary: 'Bridging technology investment with boardroom business outcomes. In-depth analysis of your operations, market dynamics, and technological bottlenecks to chart a clear, executable path to revenue growth.',
    specs: [
      'Comprehensive Enterprise Assessment: Deep-dive audit of IT assets, workflows, and licensing',
      'Data-Driven Insights: Operational KPIs, cost-per-endpoint metrics, and capacity utilization analytics',
      'Strategic IT Roadmap: Multi-year budgeting, cloud transition strategies, and tech lifecycle planning',
      'Operational Improvement: Automation of repetitive processes and vendor consolidation',
      'Performance Monitoring: Ongoing CIO-as-a-service advisory and governance checkpoints'
    ],
    timeline: '2-Week intensive audit followed by phased roadmap implementation.',
    sla: 'Direct boardroom executive presentations with actionable ROI deliverables.'
  }
};

function initModals() {
  const modal = document.getElementById('solution-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const exploreButtons = document.querySelectorAll('.explore-solution-btn');

  const modalTitle = document.getElementById('modal-title');
  const modalPartners = document.getElementById('modal-partners');
  const modalSummary = document.getElementById('modal-summary');
  const modalSpecs = document.getElementById('modal-specs');
  const modalTimeline = document.getElementById('modal-timeline');
  const modalSla = document.getElementById('modal-sla');
  const modalRfpTrigger = document.getElementById('modal-rfp-trigger');

  let currentKey = null;

  exploreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-solution-key');
      const data = solutionDetailsData[key];
      if (!data) return;

      currentKey = key;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalSummary) modalSummary.textContent = data.summary;
      if (modalTimeline) modalTimeline.textContent = data.timeline;
      if (modalSla) modalSla.textContent = data.sla;

      if (modalPartners) {
        modalPartners.innerHTML = data.partners.map(p => 
          `<span class="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold">
            ${p}
          </span>`
        ).join('');
      }

      if (modalSpecs) {
        modalSpecs.innerHTML = data.specs.map(s => 
          `<li class="flex items-start gap-2.5 text-sm text-slate-300">
            <i class="fa-solid fa-circle-check text-rose-500 mt-0.5 text-xs flex-shrink-0"></i>
            <span>${s}</span>
          </li>`
        ).join('');
      }

      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Pre-fill RFP from modal
  if (modalRfpTrigger) {
    modalRfpTrigger.addEventListener('click', () => {
      closeModal();
      const contactSection = document.getElementById('contact');
      const serviceField = document.getElementById('rfp-service');
      const messageField = document.getElementById('rfp-message');

      if (serviceField && currentKey && solutionDetailsData[currentKey]) {
        serviceField.value = solutionDetailsData[currentKey].title;
      }
      if (messageField && currentKey && solutionDetailsData[currentKey]) {
        messageField.value = `Inquiry regarding ${solutionDetailsData[currentKey].title}. Please send formal technical specifications, pricing catalogue, and deployment availability.`;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
