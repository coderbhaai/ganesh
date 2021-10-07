const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = [{
    entry: {
        Index: [path.resolve('src', 'components', 'pages', 'Index.js')],
        Auth: [path.resolve('src', 'components', 'pages', 'Auth.js')],
        Cart: [path.resolve('src', 'components', 'pages', 'Cart.js')],
        Contact: [path.resolve('src', 'components', 'pages', 'Contact.js')],
        Order: [path.resolve('src', 'components', 'pages', 'Order.js')],
        Product: [path.resolve('src', 'components', 'pages', 'Product.js')],
        Shop: [path.resolve('src', 'components', 'pages', 'Shop.js')],
        FourOFour: [path.resolve('src', 'components', 'pages', 'FourOFour.js')],
        ThankYou: [path.resolve('src', 'components', 'pages', 'ThankYou.js')],
        PrivacyPolicy: [path.resolve('src', 'components', 'pages', 'PrivacyPolicy.js')],
        Terms: [path.resolve('src', 'components', 'pages', 'Terms.js')],
        About: [path.resolve('src', 'components', 'pages', 'About.js')],
        Astrology: [path.resolve('src', 'components', 'pages', 'Astrology.js')],
        ProductCategory: [path.resolve('src', 'components', 'pages', 'ProductCategory.js')],
        ProdCatItems: [path.resolve('src', 'components', 'pages', 'ProdCatItems.js')],
        TncNavratri: [path.resolve('src', 'components', 'pages', 'TncNavratri.js')],
        
        Blog: [path.resolve('src', 'components', 'blog', 'Blog.js')],
        Category: [path.resolve('src', 'components', 'blog', 'Blog.js')],
        Search: [path.resolve('src', 'components', 'blog', 'Blog.js')],
        Single: [path.resolve('src', 'components', 'blog', 'Single.js')],
        
        AdminUser: [path.resolve('src', 'components', 'admin', 'User.js')],
        AdminContacts: [path.resolve('src', 'components', 'admin', 'AdminContacts.js')],
        AdminBlogMeta: [path.resolve('src', 'components', 'admin', 'AdminBlogMeta.js')],
        AdminBlogs: [path.resolve('src', 'components', 'admin', 'AdminBlogs.js')],
        AddBlog: [path.resolve('src', 'components', 'admin', 'AddBlog.js')],
        UpdateBlog: [path.resolve('src', 'components', 'admin', 'UpdateBlog.js')],
        AdminMeta: [path.resolve('src', 'components', 'admin', 'Meta.js')],
        AdminComments: [path.resolve('src', 'components', 'admin', 'AdminComments.js')],
        AdminBasics: [path.resolve('src', 'components', 'admin', 'Basic.js')],
        AdminCoupon: [path.resolve('src', 'components', 'admin', 'AdminCoupon.js')],
        RefSchema: [path.resolve('src', 'components', 'admin', 'RefSchema.js')],
        RefSitemap: [path.resolve('src', 'components', 'admin', 'RefSitemap.js')],

        Products: [path.resolve('src', 'components', 'admin', 'Products.js')],
        AdminOrders: [path.resolve('src', 'components', 'admin', 'AdminOrders.js')],
        AddProduct: [path.resolve('src', 'components', 'admin', 'AddProduct.js')],
        EditProduct: [path.resolve('src', 'components', 'admin', 'EditProduct.js')],
        
        UserAdmin: [path.resolve('src', 'components', 'user', 'UserAdmin.js')],
    },
    output: {
        path: path.resolve(__dirname, 'src', 'static', 'public'),
        filename: 'js/[chunkhash].js',
        publicPath: '/public'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /static/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/transform-runtime']
                    }
                }
            }, 
            {
                test: /\.ejs$/,
                loader: 'raw-loader'
            }, 
            {
                test: /\.(css)/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/public/css/'
                    }
                }, 'css-loader']  
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*']
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '.',
            cacheGroups: {
                react: {
                    chunks: 'initial',
                }
            }
        }
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ chunkFilename: 'css/[hash].css' }),
        new HtmlWebpackPlugin({ chunks: ['Auth'], filename: '../views/pages/Auth.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Index'], filename: '../views/pages/Index.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Cart'], filename: '../views/pages/Cart.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Contact'], filename: '../views/pages/Contact.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Order'], filename: '../views/pages/Order.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Product'], filename: '../views/pages/Product.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Shop'], filename: '../views/pages/Shop.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['FourOFour'], filename: '../views/pages/FourOFour.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['ThankYou'], filename: '../views/pages/ThankYou.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['PrivacyPolicy'], filename: '../views/pages/PrivacyPolicy.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Terms'], filename: '../views/pages/Terms.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['About'], filename: '../views/pages/About.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Astrology'], filename: '../views/pages/Astrology.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['ProductCategory'], filename: '../views/pages/ProductCategory.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['ProdCatItems'], filename: '../views/pages/ProdCatItems.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['TncNavratri'], filename: '../views/pages/TncNavratri.ejs', template: path.join('src', 'views', 'index.ejs') }),

        new HtmlWebpackPlugin({ chunks: ['Blog'], filename: '../views/blog/Blog.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Single'], filename: '../views/blog/Single.ejs', template: path.join('src', 'views', 'index.ejs') }),

        new HtmlWebpackPlugin({ chunks: ['AdminUser'], filename: '../views/admin/User.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminContacts'], filename: '../views/admin/AdminContacts.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminBlogMeta'], filename: '../views/admin/AdminBlogMeta.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminBlogs'], filename: '../views/admin/AdminBlogs.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AddBlog'], filename: '../views/admin/AddBlog.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['UpdateBlog'], filename: '../views/admin/UpdateBlog.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminMeta'], filename: '../views/admin/Meta.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminComments'], filename: '../views/admin/AdminComments.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminBasics'], filename: '../views/admin/AdminBasics.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminCoupon'], filename: '../views/admin/AdminCoupon.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['RefSchema'], filename: '../views/admin/RefSchema.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['RefSitemap'], filename: '../views/admin/RefSitemap.ejs', template: path.join('src', 'views', 'index.ejs') }),

        new HtmlWebpackPlugin({ chunks: ['Products'], filename: '../views/admin/Products.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminOrders'], filename: '../views/admin/AdminOrders.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AddProduct'], filename: '../views/admin/AddProduct.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['EditProduct'], filename: '../views/admin/EditProduct.ejs', template: path.join('src', 'views', 'index.ejs') }),
        
        new HtmlWebpackPlugin({ chunks: ['UserAdmin'], filename: '../views/user/UserAdmin.ejs', template: path.join('src', 'views', 'index.ejs') }),
    ]
}]

module.exports = config