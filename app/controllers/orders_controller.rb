
require 'json'

class OrdersController < ApplicationController
  before_action :check_access,:except => :new
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  # GET /orders
  # GET /orders.json
  def index
    @orders = Order.includes([:orders_products,:products]).where(status:['processing','pending'])
    respond_to do |format|
      format.html
      format.json {
        render json: @orders,
               :include => {
                   :user =>{:only => [:email,:ext]},
                   :room => {:only => [:name]},
                   :orders_products => {:include => [:product => {:methods => :image_url}]}
               },
               :methods => [:total]
      }
    end
  end

  # GET /checks
  # GET /checks.json
  def checks
    @users = User.includes([orders: [orders_products: :product]])
    respond_to do |format|
      format.html
      format.json {
        render json: @users,
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

  # GET /orders/1
  # GET /orders/1.json
  def show
  end

  # GET /orders/new
  def new
    @order = Order.new
  end

  # GET /orders/1/edit
  def edit
  end

  # POST /orders
  # POST /orders.json
  def create
    order_details = order_params
    order_products_list = order_details[:product_ids].reject{|p| p.empty?}
    order_details.delete(:product_ids)
    ActiveRecord::Base.transaction do
      @order = Order.create!(order_details)
      order_products = []
      order_products_list.each do |product|
        product=JSON.parse(product)
        order_products.push({:amount=>product['size'],:order_id=>@order.id,:product_id=>product['id']})
      end
      OrdersProduct.create!(order_products)
    end
    ActionCable.server.broadcast "orders:#{current_user.id}",{order:@order,action:"create"}
    respond_to do |format|
      format.html { redirect_to @order, notice: 'Order was successfully created.' }
      format.json { render :show, status: :created, location: @order }
    end
  rescue Exception => ex
    respond_to do |format|
      format.html { render :new }
      format.json { render json: @order.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /orders/1
  # PATCH/PUT /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: 'Order was successfully updated.' }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1
  # DELETE /orders/1.json
  def destroy
    @order.destroy
    respond_to do |format|
      format.html { redirect_to orders_url, notice: 'Order was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def order_params
    params.require(:order).permit(:status, :note, :user_id, :room_id, :product_ids=>[])
  end
  protected
  def check_access
    redirect_to :root, :flash => { :error => "you are not authorized to access" } and return unless current_user.isadmin
  end
end
