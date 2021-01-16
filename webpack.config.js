const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = [{
    entry: {
        Index: [path.resolve('src', 'components', 'pages', 'Index.js')],
        Register: [path.resolve('src', 'components', 'auth', 'Register.js')],
        Login: [path.resolve('src', 'components', 'auth', 'Login.js')],
        ForgotPassword: [path.resolve('src', 'components', 'auth', 'ForgotPassword.js')],
        ResetPassword: [path.resolve('src', 'components', 'auth', 'ResetPassword.js')],

        AdminUser: [path.resolve('src', 'components', 'admin', 'User.js')],
        AdminContacts: [path.resolve('src', 'components', 'admin', 'AdminContacts.js')],
        AdminBlogMeta: [path.resolve('src', 'components', 'admin', 'AdminBlogMeta.js')],
        AdminBlogs: [path.resolve('src', 'components', 'admin', 'AdminBlogs.js')],
        AddBlog: [path.resolve('src', 'components', 'admin', 'AddBlog.js')],
        UpdateBlog: [path.resolve('src', 'components', 'admin', 'UpdateBlog.js')],
        AdminMeta: [path.resolve('src', 'components', 'admin', 'Meta.js')],
        AdminComments: [path.resolve('src', 'components', 'admin', 'AdminComments.js')],
        AdminBasics: [path.resolve('src', 'components', 'admin', 'Basic.js')],
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
        new HtmlWebpackPlugin({ chunks: ['Index'], filename: '../views/pages/Index.ejs', template: path.join('src', 'views', 'index.ejs') }),

        new HtmlWebpackPlugin({ chunks: ['Register'], filename: '../views/auth/Register.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['Login'], filename: '../views/auth/Login.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['ForgotPassword'], filename: '../views/auth/ForgotPassword.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['ResetPassword'], filename: '../views/auth/ResetPassword.ejs', template: path.join('src', 'views', 'index.ejs') }),

        new HtmlWebpackPlugin({ chunks: ['AdminUser'], filename: '../views/admin/User.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminContacts'], filename: '../views/admin/AdminContacts.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminBlogMeta'], filename: '../views/admin/AdminBlogMeta.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminBlogs'], filename: '../views/admin/AdminBlogs.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AddBlog'], filename: '../views/admin/AddBlog.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['UpdateBlog'], filename: '../views/admin/UpdateBlog.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminMeta'], filename: '../views/admin/Meta.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminComments'], filename: '../views/admin/AdminComments.ejs', template: path.join('src', 'views', 'index.ejs') }),
        new HtmlWebpackPlugin({ chunks: ['AdminBasics'], filename: '../views/admin/AdminBasics.ejs', template: path.join('src', 'views', 'index.ejs') }),
    ]
}]

module.exports = config