class UsersController < ApplicationController
  before_action :check_access ,:except => :orders
  semantic_breadcrumb "Users", :users_path
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.json { render json: UserDatatable.new(view_context) }
    end
  end

  # GET /users/orders
  # GET /users/orders.json
  def orders
    @user = User.includes([orders: [orders_products: :product]]).find(params[:id])
    redirect_to :root, :flash => { :error => "you are not authorized to access" }  unless current_user.id==@user.id
    respond_to do |format|
      format.html
      format.json {
        render json: @user,
               :include => {
                   :orders =>{
                       :include => {
                           :orders_products => {:include => [:product]}
                       },
                       :methods => :total
                   }
               },
               :methods => :orders_total
      }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    semantic_breadcrumb @user.name, user_path(@user)
  end

  # GET /users/new
  def new
    @user = User.new
    semantic_breadcrumb "New", new_user_path
  end

  # GET /users/1/edit
  def edit
    semantic_breadcrumb @user.name, user_path(@user)
    semantic_breadcrumb "Edit", edit_user_path(@user)
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :room_id, :ext,:avatar,:isadmin)
    end
  protected
  def check_access
    redirect_to :root, :flash => { :error => "you are not authorized to access" } and return unless current_user.isadmin
  end
end
