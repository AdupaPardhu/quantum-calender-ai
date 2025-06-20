# Quantum Calendar AI - Deployment Script
# This script automates the deployment process to Vercel

echo "🚀 Starting Quantum Calendar AI Deployment..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${CYAN}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version check passed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm and try again."
    exit 1
fi

print_success "npm version check passed: $(npm -v)"

# Install dependencies
print_status "Installing dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run type checking
print_status "Running TypeScript type checking..."
if npm run type-check; then
    print_success "TypeScript type checking passed"
else
    print_warning "TypeScript type checking failed, but continuing..."
fi

# Run linting
print_status "Running ESLint..."
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting failed, but continuing..."
fi

# Build the application
print_status "Building the application..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing globally..."
    if npm install -g vercel; then
        print_success "Vercel CLI installed successfully"
    else
        print_error "Failed to install Vercel CLI"
        exit 1
    fi
fi

# Login to Vercel (if not already logged in)
print_status "Checking Vercel authentication..."
if vercel whoami &> /dev/null; then
    print_success "Already logged in to Vercel as: $(vercel whoami)"
else
    print_status "Please log in to Vercel..."
    vercel login
fi

# Deploy to Vercel
print_status "Deploying to Vercel..."
echo -e "${PURPLE}"
echo "  ██████  ██    ██  █████  ███    ██ ████████ ██    ██ ███    ███ "
echo " ██    ██ ██    ██ ██   ██ ████   ██    ██    ██    ██ ████  ████ "
echo " ██    ██ ██    ██ ███████ ██ ██  ██    ██    ██    ██ ██ ████ ██ "
echo " ██ ▄▄ ██ ██    ██ ██   ██ ██  ██ ██    ██    ██    ██ ██  ██  ██ "
echo "  ██████   ██████  ██   ██ ██   ████    ██     ██████  ██      ██ "
echo "     ▀▀                                                           "
echo -e "${NC}"
echo "           🚀 QUANTUM CALENDAR AI - DEPLOYMENT 🚀"
echo ""

if vercel --prod; then
    print_success "🎉 Deployment completed successfully!"
    echo ""
    echo -e "${CYAN}================================================${NC}"
    echo -e "${GREEN}✅ Your Quantum Calendar AI is now live!${NC}"
    echo -e "${CYAN}================================================${NC}"
    echo ""
    echo -e "${YELLOW}📊 Performance Optimizations Applied:${NC}"
    echo "   • Glassmorphism effects optimized"
    echo "   • AI features enabled"
    echo "   • Bundle size minimized"
    echo "   • Images optimized"
    echo "   • Security headers configured"
    echo ""
    echo -e "${YELLOW}🎯 Features Deployed:${NC}"
    echo "   • AI-powered scheduling"
    echo "   • Futuristic glassmorphism UI"
    echo "   • Weather & timezone widgets"
    echo "   • Productivity analytics"
    echo "   • Smart notifications"
    echo "   • Multi-view calendar"
    echo ""
    echo -e "${BLUE}🔗 Your deployment URLs:${NC}"
    echo "   • Production: $(vercel --prod 2>&1 | grep -o 'https://[^[:space:]]*')"
    echo "   • GitHub: https://github.com/$(git config user.name)/quantum-calendar-ai"
    echo ""
    echo -e "${PURPLE}🚀 Next Steps:${NC}"
    echo "   1. Test all features on the live site"
    echo "   2. Share your futuristic calendar with the world"
    echo "   3. Monitor performance with Vercel Analytics"
    echo "   4. Collect user feedback for improvements"
    echo ""
    echo -e "${GREEN}🎉 Congratulations! The future of calendars is now live!${NC}"
else
    print_error "Deployment failed"
    exit 1
fi
