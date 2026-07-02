# AI PROMPT TEMPLATE FOR WEB DASHBOARD REDESIGN

## Copy this entire prompt and add your component code at the bottom

---

**TASK**: Redesign the web dashboard component below using the PausePoint Web Dashboard Design System.

**REQUIREMENTS**:
Follow this design system EXACTLY. This is a production dashboard with an established design language. Your redesign must match the modern admin/estate dashboard aesthetic perfectly.

---

## DESIGN SYSTEM TO FOLLOW

### Colors

```css
/* Primary */
PRIMARY_GREEN: #10B981
BACKGROUND: #F9FAFB
CARD_WHITE: #FFFFFF
TEXT_PRIMARY: #111827
TEXT_SECONDARY: #374151
TEXT_TERTIARY: #6B7280

/* Sidebar */
SIDEBAR_DARK: linear-gradient(180deg, #1F2937 0%, #111827 100%)
SIDEBAR_LIGHT: #FFFFFF

/* Status Colors */
SUCCESS: #10B981, SUCCESS_LIGHT: #D1FAE5
WARNING: #F59E0B, WARNING_LIGHT: #FEF3C7
ERROR: #DC2626, ERROR_LIGHT: #FEE2E2
INFO: #2563EB, INFO_LIGHT: #DBEAFE

/* Service Colors */
ELECTRICITY: #F59E0B, BG: #FEF3C7
ESUSU: #3B82F6, BG: #DBEAFE
RESIDENTS: #6366F1, BG: #E0E7FF
```

### Standard Card

```css
{
  background: white,
  borderRadius: 12px,
  padding: 24px,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  marginBottom: 24px,
}
```

### Stats Card

```css
{
  background: white,
  borderRadius: 12px,
  padding: 24px,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  cursor: pointer,
}

/* On hover */
{
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  transform: 'translateY(-2px)',
}
```

### Icon Container

```css
{
  width: 48px,
  height: 48px,
  borderRadius: 12px,
  background: '#D1FAE5', /* Use service color */
  display: flex,
  alignItems: center,
  justifyContent: center,
  color: '#10B981',
}
```

### Primary Button

```css
{
  padding: '12px 24px',
  background: '#10B981',
  color: 'white',
  fontSize: 14px,
  fontWeight: 600,
  borderRadius: 8px,
  border: none,
  cursor: pointer,
  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  display: inline-flex,
  alignItems: center,
  gap: 8px,
}
```

### Typography

- Page Titles: 28px, weight 700
- Section Headers: 18-20px, weight 700
- Card Titles: 16-18px, weight 600
- Body Text: 14px, weight 500
- Labels: 12-13px, weight 600

### Spacing

- Container: padding 24-32px
- Cards: padding 24px
- Grid gap: 24px
- Section spacing: 32px
- Icon containers: 48x48px

### Critical Rules

1. ✅ Main background must be #F9FAFB
2. ✅ All cards white with subtle shadows (no borders)
3. ✅ Border radius: 12px for cards, 8px for buttons
4. ✅ Use 24px grid gaps
5. ✅ Typography: numeric weights (600, 700)
6. ✅ Icon containers: 48x48px with pastel backgrounds
7. ✅ Primary green: #10B981 for main actions
8. ✅ Add hover states to interactive elements
9. ✅ Tables: hover rows, sticky headers
10. ✅ Modals: centered with backdrop blur

---

## REDESIGN INSTRUCTIONS

1. **Update Layout Structure**:
   - Use proper grid system (12-column)
   - Add responsive breakpoints
   - Implement sticky positioning where needed

2. **Convert all sections to white cards**:
   - Remove borders
   - Add subtle box-shadow
   - Use 12px border radius
   - Add 24px padding

3. **Update all icon containers**:
   - Size: 48x48px
   - Border radius: 12px
   - Pastel backgrounds
   - Colored icons

4. **Update all buttons**:
   - Use button styles from design system
   - Add proper hover/active states
   - Include icons where appropriate
   - Add colored shadows for primary buttons

5. **Update typography**:
   - Use correct font sizes
   - Apply numeric font weights
   - Add letter spacing where needed

6. **Update tables** (if any):
   - Sticky header
   - Hover rows
   - Proper padding (16px vertical, 24px horizontal)
   - Zebra striping optional

7. **Update forms** (if any):
   - Proper input styling
   - Focus states with green outline
   - Error states
   - Help text

8. **Add transitions**:
   - Cards: hover lift effect
   - Buttons: smooth color changes
   - All: 0.2-0.3s ease

---

## COMPONENT PATTERNS

### Stats Card Pattern

```jsx
<div className="stats-card" style={{
  background: 'white',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: '#D1FAE5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#10B981',
    }}>
      <Icon size={24} />
    </div>
    
    <div style={{
      padding: '4px 8px',
      borderRadius: '6px',
      background: '#D1FAE5',
      color: '#065F46',
      fontSize: '12px',
      fontWeight: 600,
    }}>
      +12.5%
    </div>
  </div>
  
  <div style={{
    fontSize: '32px',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '4px',
    fontFamily: 'monospace',
  }}>
    ₦12.5M
  </div>
  
  <div style={{
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: 500,
  }}>
    Total Revenue
  </div>
</div>
```

### Content Card Pattern

```jsx
<div style={{
  background: 'white',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
}}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #F3F4F6',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: '#D1FAE5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#10B981',
      }}>
        <Icon size={20} />
      </div>
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#111827',
          marginBottom: '2px',
        }}>
          Section Title
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#6B7280',
        }}>
          Subtitle text
        </p>
      </div>
    </div>
    
    <button className="btn-primary">Action</button>
  </div>
  
  {/* Content */}
</div>
```

### Table Pattern

```jsx
<div style={{
  background: 'white',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
}}>
  <div style={{
    padding: '20px 24px',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <h3 style={{
      fontSize: '18px',
      fontWeight: 700,
      color: '#111827',
    }}>
      Recent Transactions
    </h3>
    <div style={{ display: 'flex', gap: '12px' }}>
      <button className="btn-secondary btn-sm">Filter</button>
      <button className="btn-secondary btn-sm">Export</button>
    </div>
  </div>
  
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead style={{ background: '#F9FAFB' }}>
        <tr>
          <th style={{
            padding: '12px 24px',
            textAlign: 'left',
            fontSize: '12px',
            fontWeight: 600,
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '1px solid #E5E7EB',
          }}>
            Column
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{
          borderBottom: '1px solid #F3F4F6',
          transition: 'background 0.2s ease',
        }}>
          <td style={{
            padding: '16px 24px',
            fontSize: '14px',
            color: '#374151',
          }}>
            Data
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div style={{
    padding: '16px 24px',
    borderTop: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <div style={{ fontSize: '14px', color: '#6B7280' }}>
      Showing 1-10 of 50
    </div>
    <div style={{ display: 'flex', gap: '8px' }}>
      <button className="pagination-btn">Previous</button>
      <button className="pagination-btn active">1</button>
      <button className="pagination-btn">2</button>
      <button className="pagination-btn">Next</button>
    </div>
  </div>
</div>
```

---

## EXAMPLE TRANSFORMATION

### ❌ BEFORE (Old Style)

```jsx
<div style={{
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '15px',
  marginBottom: '10px',
}}>
  <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Stats</h3>
  <p style={{ fontSize: '24px' }}>$1,234</p>
  <button style={{
    background: '#007bff',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
  }}>
    View Details
  </button>
</div>
```

### ✅ AFTER (New Style)

```jsx
<div style={{
  background: 'white',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: '#D1FAE5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#10B981',
    }}>
      <DollarIcon size={24} />
    </div>
    <div style={{
      padding: '4px 8px',
      borderRadius: '6px',
      background: '#D1FAE5',
      color: '#065F46',
      fontSize: '12px',
      fontWeight: 600,
    }}>
      +5.2%
    </div>
  </div>
  
  <div style={{
    fontSize: '32px',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '4px',
    fontFamily: 'monospace',
  }}>
    $1,234
  </div>
  
  <div style={{
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: 500,
  }}>
    Total Revenue
  </div>
  
  <div style={{
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #F3F4F6',
  }}>
    <button style={{
      padding: '12px 24px',
      background: '#10B981',
      color: 'white',
      fontSize: '14px',
      fontWeight: 600,
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
      width: '100%',
    }}>
      View Details
    </button>
  </div>
</div>
```

---

## OUTPUT REQUIREMENTS

1. Return the COMPLETE redesigned component code
2. Update ALL styles to match design system
3. Maintain ALL original functionality
4. Add proper hover/focus/active states
5. Include responsive breakpoints if needed
6. Add transitions for interactive elements
7. Ensure accessibility (aria labels, semantic HTML)
8. Use proper React/Vue/framework patterns

---

## COMPONENT CODE TO REDESIGN

[PASTE YOUR WEB COMPONENT CODE BELOW THIS LINE]

---

```jsx
// PASTE YOUR REACT/VUE/HTML COMPONENT CODE HERE
```

---

## VALIDATION CHECKLIST

After redesign, verify:

- [ ] Background is #F9FAFB (or white for cards)
- [ ] All cards have 12px border radius
- [ ] All cards have subtle box-shadow (no borders)
- [ ] Icon containers are 48x48px with pastel backgrounds
- [ ] Typography uses correct sizes and weights
- [ ] Primary button is #10B981 with shadow
- [ ] Spacing uses 24px for gaps, 24-32px for padding
- [ ] All interactive elements have hover states
- [ ] Tables have sticky header and hover rows
- [ ] Grid uses 24px gap
- [ ] Forms have proper focus states
- [ ] Status badges use correct colors
- [ ] Responsive breakpoints work
- [ ] Transitions are smooth (0.2-0.3s)
- [ ] Looks professional and modern

---

## FRAMEWORK-SPECIFIC NOTES

### React + Tailwind CSS

```jsx
// Use Tailwind classes that match the design system
<div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
  <div className="flex justify-between items-start mb-4">
    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
      <Icon size={24} />
    </div>
    <span className="px-2 py-1 rounded-md bg-green-100 text-green-900 text-xs font-semibold">
      +12%
    </span>
  </div>
  <div className="text-3xl font-bold text-gray-900 mb-1 font-mono">
    ₦12.5M
  </div>
  <div className="text-sm text-gray-600 font-medium">
    Total Revenue
  </div>
</div>
```

### Vue 3 + Composition API

```vue
<template>
  <div class="stats-card">
    <div class="stats-header">
      <div class="icon-container" :style="{ background: iconBg }">
        <component :is="icon" :size="24" />
      </div>
      <div class="trend-badge" :class="trendClass">
        {{ trend }}
      </div>
    </div>
    <div class="stats-value">{{ value }}</div>
    <div class="stats-label">{{ label }}</div>
  </div>
</template>

<style scoped>
.stats-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.stats-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-value {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
  font-family: monospace;
}

.stats-label {
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
}
</style>
```

### Plain HTML/CSS

```html
<div class="stats-card">
  <div class="stats-card-header">
    <div class="stats-card-icon" style="background: #D1FAE5; color: #10B981;">
      <svg width="24" height="24"><!-- icon --></svg>
    </div>
    <div class="stats-card-trend stats-card-trend-up">+12.5%</div>
  </div>
  <div class="stats-card-value">₦12.5M</div>
  <div class="stats-card-label">Total Revenue</div>
</div>

<style>
  .stats-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .stats-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .stats-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .stats-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stats-card-trend {
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }

  .stats-card-trend-up {
    background: #D1FAE5;
    color: #065F46;
  }

  .stats-card-value {
    font-size: 32px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 4px;
    font-family: monospace;
  }

  .stats-card-label {
    font-size: 14px;
    color: #6B7280;
    font-weight: 500;
  }
</style>
```

---

**START REDESIGN NOW**

Remember: The goal is to create a modern, professional dashboard interface that matches the PausePoint design language. Every component should feel cohesive with the overall design system.
